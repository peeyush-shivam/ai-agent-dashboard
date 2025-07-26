import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
} from "reactflow";
import type { Node, Edge, Connection, NodeChange, EdgeChange } from "reactflow";

interface WorkflowState {
  nodes: Node[];
  edges: Edge[];
  nodeIDs: Record<string, number>;
  loading: boolean;
  error: string | null;
}

const initialState: WorkflowState = {
  nodes: [],
  edges: [],
  nodeIDs: {},
  loading: false,
  error: null,
};

// Edge styling configuration
const EDGE_STYLE = {
  type: "smoothstep" as const,
  animated: true,
  markerEnd: { type: MarkerType.Arrow, height: 20, width: 20 },
  style: { stroke: "#6366f1", strokeWidth: 2 },
};

export const workflowSlice = createSlice({
  name: "workflow",
  initialState,
  reducers: {
    addNode: (state, action: PayloadAction<Node>) => {
      try {
        state.nodes.push(action.payload);
        state.error = null;
      } catch (error) {
        console.error("Error adding node:", error);
        state.error = "Failed to add node";
      }
    },
    deleteNode: (state, action: PayloadAction<string>) => {
      try {
        const nodeId = action.payload;
        state.nodes = state.nodes.filter((node) => node.id !== nodeId);
        state.edges = state.edges.filter(
          (edge) => edge.target !== nodeId && edge.source !== nodeId
        );
        state.error = null;
      } catch (error) {
        console.error("Error deleting node:", error);
        state.error = "Failed to delete node";
      }
    },
    deleteEdgesByNodeId: (state, action: PayloadAction<string>) => {
      try {
        const nodeId = action.payload;
        state.edges = state.edges.filter(
          (edge) => edge.target !== nodeId && edge.source !== nodeId
        );
        state.error = null;
      } catch (error) {
        console.error("Error deleting edges:", error);
        state.error = "Failed to delete edges";
      }
    },
    onNodesChange: (state, action: PayloadAction<NodeChange[]>) => {
      try {
        state.nodes = applyNodeChanges(action.payload, state.nodes);
        state.error = null;
      } catch (error) {
        console.error("Error applying node changes:", error);
        state.error = "Failed to update nodes";
      }
    },
    onEdgesChange: (state, action: PayloadAction<EdgeChange[]>) => {
      try {
        state.edges = applyEdgeChanges(action.payload, state.edges);
        state.error = null;
      } catch (error) {
        console.error("Error applying edge changes:", error);
        state.error = "Failed to update edges";
      }
    },
    onConnect: (state, action: PayloadAction<Connection>) => {
      try {
        const newEdge = addEdge(
          {
            ...action.payload,
            ...EDGE_STYLE,
          },
          state.edges
        );
        state.edges = newEdge;
        state.error = null;
      } catch (error) {
        console.error("Error connecting nodes:", error);
        state.error = "Failed to connect nodes";
      }
    },
    updateNodeField: (
      state,
      action: PayloadAction<{
        nodeId: string;
        fieldName: string;
        fieldValue: string | number | boolean;
      }>
    ) => {
      try {
        const { nodeId, fieldName, fieldValue } = action.payload;
        const node = state.nodes.find((n) => n.id === nodeId);
        if (node) {
          node.data = { ...node.data, [fieldName]: fieldValue };
          state.error = null;
        } else {
          state.error = "Node not found";
        }
      } catch (error) {
        console.error("Error updating node field:", error);
        state.error = "Failed to update node field";
      }
    },
    clearWorkflow: (state) => {
      try {
        state.nodes = [];
        state.edges = [];
        state.nodeIDs = {};
        state.error = null;
      } catch (error) {
        console.error("Error clearing workflow:", error);
        state.error = "Failed to clear workflow";
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  addNode,
  deleteNode,
  deleteEdgesByNodeId,
  onNodesChange,
  onEdgesChange,
  onConnect,
  updateNodeField,
  clearWorkflow,
  setLoading,
  setError,
} = workflowSlice.actions;

// Optimized selectors with memoization hints
export const selectNodes = (state: { workflow: WorkflowState }) =>
  state.workflow.nodes;

export const selectEdges = (state: { workflow: WorkflowState }) =>
  state.workflow.edges;

export const selectNodeIDs = (state: { workflow: WorkflowState }) =>
  state.workflow.nodeIDs;

export const selectWorkflowLoading = (state: { workflow: WorkflowState }) =>
  state.workflow.loading;

export const selectWorkflowError = (state: { workflow: WorkflowState }) =>
  state.workflow.error;

// Additional selectors for better performance
export const selectNodeById = (
  state: { workflow: WorkflowState },
  nodeId: string
) => state.workflow.nodes.find((node) => node.id === nodeId);

export const selectEdgesByNodeId = (
  state: { workflow: WorkflowState },
  nodeId: string
) =>
  state.workflow.edges.filter(
    (edge) => edge.source === nodeId || edge.target === nodeId
  );

export const selectWorkflowStats = (state: { workflow: WorkflowState }) => ({
  nodeCount: state.workflow.nodes.length,
  edgeCount: state.workflow.edges.length,
  hasError: !!state.workflow.error,
  isLoading: state.workflow.loading,
});

export default workflowSlice.reducer;
