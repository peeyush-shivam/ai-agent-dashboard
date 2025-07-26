import { CirclePlay, Cpu, SquareFunction, CirclePause } from "lucide-react";
import StartNode from "@/components/workflow/StartNode";
import EndNode from "@/components/workflow/EndNode";
import ProcessNode from "@/components/workflow/ProcessNode";
import DecisionNode from "@/components/workflow/DecisionNode";

// Grid and display constants
export const GRID_SIZE = 20;
export const PRO_OPTIONS = { hideAttribution: true };

// Node types configuration
export const NODE_TYPES = {
  startNode: StartNode,
  endNode: EndNode,
  processNode: ProcessNode,
  decisionNode: DecisionNode,
} as const;

// Node buttons configuration
export const NODE_BUTTONS = [
  { type: "startNode", label: "Start Node", icon: CirclePlay },
  { type: "processNode", label: "Process Node", icon: Cpu },
  { type: "decisionNode", label: "Decision Node", icon: SquareFunction },
  { type: "endNode", label: "End Node", icon: CirclePause },
] as const;

// Z-index constants for proper layering
export const Z_INDICES = {
  BACK_BUTTON: 9999,
  SAVE_BUTTON: 9999,
  TOOLBAR: 9998,
} as const;
