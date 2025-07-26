import React, { useCallback, useState } from "react";
import { Position } from "reactflow";
import { Select } from "antd";
import { CirclePause } from "lucide-react";
import BaseNode from "./BaseNode";
import type { WorkflowNodeData } from "@/types";

const EndNode: React.FC<{ id: string; data: WorkflowNodeData }> = ({
  id,
  data,
}) => {
  const [outputType, setOutputType] = useState("Text");

  const handleTypeChange = useCallback((value: string) => {
    setOutputType(value);
  }, []);

  const uniqueJSX = (
    <div className="flex flex-col space-y-1">
      <label className="text-xs text-gray-600 dark:text-gray-400">Type:</label>
      <Select
        className="nodrag nopan"
        value={outputType}
        onChange={handleTypeChange}
        size="small"
        options={[
          { value: "Text", label: "Text" },
          { value: "File", label: "File" },
          { value: "JSON", label: "JSON" },
        ]}
      />
    </div>
  );

  const nodeIcon = <CirclePause height={16} width={16} />;

  return (
    <BaseNode
      id={id}
      data={data}
      type="End"
      label="Name"
      handles={[{ type: "target", position: Position.Left }]}
      uniqueJSX={uniqueJSX}
      nodeIcon={nodeIcon}
    />
  );
};

export default EndNode;
