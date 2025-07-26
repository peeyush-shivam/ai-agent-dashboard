import React, { useCallback, useState, memo } from "react";
import { Position } from "reactflow";
import { Select } from "antd";
import { CirclePlay } from "lucide-react";
import BaseNode from "./BaseNode";
import type { WorkflowNodeData } from "@/types";

const StartNode: React.FC<{ id: string; data: WorkflowNodeData }> = memo(
  ({ id, data }) => {
    const [inputType, setInputType] = useState("Text");

    const handleTypeChange = useCallback((value: string) => {
      setInputType(value);
    }, []);

    const uniqueJSX = React.useMemo(
      () => (
        <div className="flex flex-col space-y-1">
          <label className="text-xs text-gray-600 dark:text-gray-400">
            Type:
          </label>
          <Select
            className="nodrag nopan"
            value={inputType}
            onChange={handleTypeChange}
            size="small"
            options={[
              { value: "Text", label: "Text" },
              { value: "File", label: "File" },
            ]}
          />
        </div>
      ),
      [inputType, handleTypeChange]
    );

    const nodeIcon = <CirclePlay height={16} width={16} />;

    return (
      <BaseNode
        id={id}
        data={data}
        type="Start"
        label="Name"
        handles={[{ type: "source", position: Position.Right }]}
        uniqueJSX={uniqueJSX}
        nodeIcon={nodeIcon}
      />
    );
  }
);

StartNode.displayName = "StartNode";

export default StartNode;
