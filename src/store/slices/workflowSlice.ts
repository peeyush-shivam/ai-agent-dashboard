import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Workflow } from "../../types";

interface WorkflowState {
  workflows: Workflow[];
  currentWorkflow: Workflow | null;
  loading: boolean;
  error: string | null;
}

const initialState: WorkflowState = {
  workflows: [],
  currentWorkflow: null,
  loading: false,
  error: null,
};

export const workflowSlice = createSlice({
  name: "workflows",
  initialState,
  reducers: {
    // Actions will be added here
  },
});

export default workflowSlice.reducer;
