import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Agent } from "../../types";

interface AgentState {
  agents: Agent[];
  loading: boolean;
  error: string | null;
}

const initialState: AgentState = {
  agents: [],
  loading: false,
  error: null,
};

export const agentSlice = createSlice({
  name: "agents",
  initialState,
  reducers: {
    // Actions will be added here
  },
});

export default agentSlice.reducer;
