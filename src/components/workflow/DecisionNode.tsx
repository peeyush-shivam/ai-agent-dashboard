import React, { useCallback, useState } from "react";
import { Position } from "reactflow";
import { Input, Select } from "antd";
import { SquareFunction } from "lucide-react";
import BaseNode from "./BaseNode";
import type { WorkflowNodeData } from "@/types";

const DecisionNode: React.FC<{ id: string; data: WorkflowNodeData }> = ({
  id,
  data,
}) => {
  const [functionName, setFunctionName] = useState("processData");
  const [language, setLanguage] = useState("JavaScript");

  const handleFunctionChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFunctionName(e.target.value);
    },
    []
  );

  const handleLanguageChange = useCallback((value: string) => {
    setLanguage(value);
  }, []);

  const uniqueJSX = (
    <div className="space-y-2">
      <div className="flex flex-col space-y-1">
        <label className="text-xs text-gray-600 dark:text-gray-400">
          Condition:
        </label>
        <Input
          className="nodrag nopan"
          type="text"
          value={functionName}
          onChange={handleFunctionChange}
          placeholder="Enter condition..."
          size="small"
        />
      </div>
      <div className="flex flex-col space-y-1">
        <label className="text-xs text-gray-600 dark:text-gray-400">
          Type:
        </label>
        <Select
          className="nodrag nopan "
          value={language}
          onChange={handleLanguageChange}
          size="small"
          options={[
            { value: "JavaScript", label: "JavaScript" },
            { value: "Python", label: "Python" },
            { value: "TypeScript", label: "TypeScript" },
            { value: "Go", label: "Go" },
          ]}
        />
      </div>
    </div>
  );

  const nodeIcon = <SquareFunction height={16} width={16} />;

  return (
    <BaseNode
      id={id}
      data={data}
      type="Decision"
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

export default DecisionNode;
