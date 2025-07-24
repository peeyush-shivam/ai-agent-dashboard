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
export interface WorkflowNode {
  id: string;
  type: "Start" | "Process" | "Decision" | "End";
  position: { x: number; y: number };
  data: {
    label: string;
    description?: string;
  };
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

export interface SearchState {
  query: string;
  filteredAgents: Agent[];
}

// App State
export interface AppState {
  agents: Agent[];
  workflows: Workflow[];
  modals: ModalState;
  search: SearchState;
  theme: "light" | "dark";
}
