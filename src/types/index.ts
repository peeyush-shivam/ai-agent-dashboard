// Agent Types
export interface Agent {
  id: string;
  name: string;
  description: string;
  status: "Running" | "Idle" | "Error";
  lastActive: string; // ISO timestamp
  createdBy: string;
  uptime: string;
  lastExecutionTime: string;
  isActive: boolean;
}

// Execution History Types
export interface ExecutionRecord {
  id: string;
  timestamp: string;
  status: "Success" | "Failure";
  logs?: string;
}

// Workflow Types
export interface WorkflowNodeData {
  id: string;
  nodeType: string;
  inputName?: string;
  [key: string]: unknown;
}

export interface WorkflowNode {
  id: string;
  type: "startNode" | "processNode" | "decisionNode" | "endNode";
  position: { x: number; y: number };
  data: WorkflowNodeData;
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  type: "default";
}

export interface Workflow {
  id: string;
  name: string;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  createdAt: string;
  updatedAt: string;
}

// UI State Types
export interface ModalState {
  agentDetail: boolean;
  deleteConfirmation: boolean;
}
