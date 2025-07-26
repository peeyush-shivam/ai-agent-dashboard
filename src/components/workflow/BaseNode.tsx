import React, { useCallback, useMemo, useState, memo } from "react";
import { Handle, Position } from "reactflow";
import { Input } from "antd";
import { Trash2 } from "lucide-react";
import { useAppDispatch } from "@/store/hooks";
import { deleteNode, updateNodeField } from "@/store/slices/workflowSlice";
import type { WorkflowNodeData } from "@/types";

interface HandleConfig {
  type: "source" | "target";
  position: Position;
  style?: React.CSSProperties;
}

interface BaseNodeProps {
  id: string;
  data: WorkflowNodeData;
  label: string;
  inputType?: "text" | "number" | "email" | "password";
  type: string;
  disabled?: boolean;
  uniqueJSX?: React.ReactNode;
  handles?: HandleConfig[];
  handleStyle?: React.CSSProperties;
  nodeIcon?: React.ReactNode;
}

// Default handle style
const DEFAULT_HANDLE_STYLE: React.CSSProperties = {
  height: "8px",
  width: "8px",
  backgroundColor: "#d9c9fe",
  border: "1px solid #2F116C",
};

const BaseNode: React.FC<BaseNodeProps> = memo(
  ({
    id,
    data,
    label,
    inputType = "text",
    type,
    disabled = false,
    uniqueJSX,
    handles = [],
    handleStyle = DEFAULT_HANDLE_STYLE,
    nodeIcon,
  }) => {
    const dispatch = useAppDispatch();

    // Initialize name from data or generate from id
    const initialName = useMemo(() => {
      return data?.inputName || id.replace(/^.*?-/, "").replace(/-/g, "_");
    }, [data?.inputName, id]);

    const [currName, setCurrName] = useState(initialName);

    // Memoized handlers
    const handleNameChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setCurrName(newValue);

        try {
          dispatch(
            updateNodeField({
              nodeId: id,
              fieldName: "inputName",
              fieldValue: newValue,
            })
          );
        } catch (error) {
          console.error("Error updating node field:", error);
        }
      },
      [dispatch, id]
    );

    const handleDelete = useCallback(() => {
      try {
        dispatch(deleteNode(id));
      } catch (error) {
        console.error("Error deleting node:", error);
      }
    }, [dispatch, id]);

    // Memoized rendered handles
    const renderedHandles = useMemo(
      () =>
        handles.map((indvHandle, index) => (
          <Handle
            key={`${id}-${indvHandle.type}-${index}`}
            type={indvHandle.type}
            position={indvHandle.position}
            id={`${id}-${indvHandle.type}-${index}`}
            style={{ ...handleStyle, ...indvHandle.style }}
          />
        )),
      [handles, handleStyle, id]
    );

    // Memoized input field
    const inputField = useMemo(() => {
      if (disabled) return null;

      return (
        <div className="flex flex-col space-y-1">
          <label className="text-xs text-gray-600 dark:text-gray-400">
            {label}
          </label>
          <Input
            className="nodrag nopan"
            type={inputType}
            value={currName}
            onChange={(e) => handleNameChange(e)}
            placeholder={`Enter ${label.toLowerCase()}...`}
            size="small"
          />
        </div>
      );
    }, [disabled, label, inputType, currName, handleNameChange]);

    return (
      <div className="basenode bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700 shadow-sm min-w-[200px]">
        <div className="flex justify-between items-center pb-2">
          <span className="flex items-center gap-1 text-sm font-medium text-gray-900 dark:text-white">
            {nodeIcon}
            {type}
          </span>
          <Trash2
            className="cursor-pointer text-gray-400 hover:text-red-500 transition-colors"
            height={16}
            width={16}
            onClick={handleDelete}
          />
        </div>

        {inputField}
        {uniqueJSX}
        {renderedHandles}
      </div>
    );
  }
);

BaseNode.displayName = "BaseNode";

export default BaseNode;
