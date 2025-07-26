import React, { useCallback, useState } from "react";
import { Position } from "reactflow";
import { Select, Input } from "antd";
import { Cpu } from "lucide-react";
import BaseNode from "./BaseNode";
import type { WorkflowNodeData } from "@/types";

const ProcessNode: React.FC<{ id: string; data: WorkflowNodeData }> = ({
  id,
  data,
}) => {
  const [modelType, setModelType] = useState("GPT-4");
  const [temperature, setTemperature] = useState("0.7");

  const handleModelChange = useCallback((value: string) => {
    setModelType(value);
  }, []);

  const handleTemperatureChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTemperature(e.target.value);
    },
    []
  );

  const uniqueJSX = (
    <div className="space-y-2">
      <div className="flex flex-col space-y-1">
        <label className="text-xs text-gray-600 dark:text-gray-400">
          Model:
        </label>
        <Select
          className="nodrag nopan"
          value={modelType}
          onChange={handleModelChange}
          size="small"
          options={[
            { value: "GPT-4", label: "GPT-4" },
            { value: "GPT-3.5", label: "GPT-3.5" },
            { value: "Claude", label: "Claude" },
            { value: "Llama", label: "Llama" },
          ]}
        />
      </div>
      <div className="flex flex-col space-y-1">
        <label className="text-xs text-gray-600 dark:text-gray-400">
          Temperature:
        </label>
        <Input
          className="nodrag nopan"
          type="number"
          min="0"
          max="2"
          step="0.1"
          value={temperature}
          onChange={handleTemperatureChange}
          size="small"
        />
      </div>
    </div>
  );

  const nodeIcon = <Cpu height={16} width={16} />;

  return (
    <BaseNode
      id={id}
      data={data}
      type="Process"
      label="Name"
      handles={[
        { type: "target", position: Position.Left },
        { type: "source", position: Position.Right },
      ]}
      uniqueJSX={uniqueJSX}
      nodeIcon={nodeIcon}
    />
  );
};

export default ProcessNode;
