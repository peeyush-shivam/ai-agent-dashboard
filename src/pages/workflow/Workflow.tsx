import React, { useState, useRef, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ReactFlow, {
  Controls,
  Background,
  MiniMap,
  ReactFlowProvider,
  type NodeChange,
  type EdgeChange,
  type Connection,
  type ReactFlowInstance,
} from "reactflow";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { ArrowLeftOutlined, SaveOutlined } from "@ant-design/icons";
import {
  onNodesChange,
  onEdgesChange,
  onConnect,
  addNode,
  selectNodes,
  selectEdges,
  clearWorkflow,
} from "@/store/slices/workflowSlice";
import StartNode from "@/components/workflow/StartNode";
import EndNode from "@/components/workflow/EndNode";
import ProcessNode from "@/components/workflow/ProcessNode";
import DecisionNode from "@/components/workflow/DecisionNode";
import { Button, message, Tooltip, App } from "antd";
import { CirclePlay, Cpu, SquareFunction, CirclePause } from "lucide-react";
import "reactflow/dist/style.css";

// Constants
const GRID_SIZE = 20;
const PRO_OPTIONS = { hideAttribution: true };

// Node types configuration
const NODE_TYPES = {
  startNode: StartNode,
  endNode: EndNode,
  processNode: ProcessNode,
  decisionNode: DecisionNode,
} as const;

// Node buttons configuration
const NODE_BUTTONS = [
  { type: "startNode", label: "Start Node", icon: CirclePlay },
  { type: "processNode", label: "Process Node", icon: Cpu },
  { type: "decisionNode", label: "Decision Node", icon: SquareFunction },
  { type: "endNode", label: "End Node", icon: CirclePause },
] as const;

const Workflow: React.FC = () => {
  const { notification } = App.useApp();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const nodes = useAppSelector(selectNodes);
  const edges = useAppSelector(selectEdges);

  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);

  // Memoized handlers
  const handleBack = useCallback(() => {
    navigate("/");
    dispatch(clearWorkflow());
  }, [navigate, dispatch]);

  const handleSave = useCallback(() => {
    try {
      // TODO: Implement save functionality
      console.log("Saving workflow...", { nodes, edges });

      // Show success notification
      notification.success({
        message: "Workflow Saved",
        description: "Workflow saved successfully.",
        placement: "topRight",
        duration: 3,
      });

      // Clear the workflow
      dispatch(clearWorkflow());

      // Navigate back to dashboard
      navigate("/");
    } catch (error) {
      console.error("Error saving workflow:", error);
      notification.error({
        message: "Save Failed",
        description: "Failed to save workflow. Please try again.",
        placement: "topRight",
        duration: 4,
      });
    }
  }, [nodes, edges, dispatch, navigate, notification]);

  const getInitNodeData = useCallback((nodeID: string, type: string) => {
    return { id: nodeID, nodeType: type };
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      if (!reactFlowWrapper.current || !reactFlowInstance) {
        console.warn("ReactFlow not initialized");
        return;
      }

      try {
        const reactFlowBounds =
          reactFlowWrapper.current.getBoundingClientRect();
        const dataTransfer = event.dataTransfer.getData(
          "application/reactflow"
        );

        if (!dataTransfer) {
          console.warn("No data transfer found");
          return;
        }

        const appData = JSON.parse(dataTransfer);
        const type = appData?.nodeType;

        if (!type) {
          console.warn("Invalid node type");
          return;
        }

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const nodeID = `${type}-${Date.now()}`;
        const newNode = {
          id: nodeID,
          type,
          position,
          data: getInitNodeData(nodeID, type),
        };

        dispatch(addNode(newNode));
      } catch (error) {
        console.error("Error dropping node:", error);
        message.error("Failed to add node");
      }
    },
    [reactFlowInstance, dispatch, getInitNodeData]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const handleDragStart = useCallback(
    (event: React.DragEvent, nodeType: string) => {
      event.dataTransfer.setData(
        "application/reactflow",
        JSON.stringify({ nodeType })
      );
    },
    []
  );

  // Memoized ReactFlow event handlers
  const handleNodesChange = useCallback(
    (changes: NodeChange[]) => dispatch(onNodesChange(changes)),
    [dispatch]
  );

  const handleEdgesChange = useCallback(
    (changes: EdgeChange[]) => dispatch(onEdgesChange(changes)),
    [dispatch]
  );

  const handleConnect = useCallback(
    (connection: Connection) => dispatch(onConnect(connection)),
    [dispatch]
  );

  // Memoized toolbar buttons
  const toolbarButtons = useMemo(
    () =>
      NODE_BUTTONS.map((button) => {
        const IconComponent = button.icon;
        return (
          <Tooltip
            key={button.type}
            title={button.label}
            zIndex={9999}
            placement="bottom"
          >
            <div
              className="flex items-center justify-center w-10 h-10 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 cursor-grab hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200 shadow-sm"
              draggable
              onDragStart={(event) => handleDragStart(event, button.type)}
            >
              <IconComponent
                size={20}
                className="text-gray-600 dark:text-gray-300"
              />
            </div>
          </Tooltip>
        );
      }),
    [handleDragStart]
  );

  return (
    <div className="h-screen w-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200">
      {/* Floating Back Button - Top Left */}
      <div className="fixed top-4 left-4 z-[9999]">
        <Button onClick={handleBack} icon={<ArrowLeftOutlined />}>
          Back
        </Button>
      </div>

      {/* Floating Save Button - Top Right */}
      <div className="fixed top-4 right-4 z-[9999]">
        <Button type="primary" onClick={handleSave} icon={<SaveOutlined />}>
          Save
        </Button>
      </div>

      {/* Simple Toolbar - Top Center */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[9998]">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 px-4 py-3">
          <div className="flex items-center space-x-3">{toolbarButtons}</div>
        </div>
      </div>

      <div ref={reactFlowWrapper} className="w-full h-full">
        <ReactFlowProvider>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={handleNodesChange}
            onEdgesChange={handleEdgesChange}
            onConnect={handleConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onInit={setReactFlowInstance}
            nodeTypes={NODE_TYPES}
            proOptions={PRO_OPTIONS}
            snapGrid={[GRID_SIZE, GRID_SIZE]}
            fitView
            attributionPosition="bottom-left"
          >
            <Background color="#aaa" gap={GRID_SIZE} />
            <Controls />
            <MiniMap />
          </ReactFlow>
        </ReactFlowProvider>
      </div>
    </div>
  );
};

export default React.memo(Workflow);
