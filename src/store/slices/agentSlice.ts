import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Agent } from "../../types";
import { agentService } from "../../services";

interface AgentState {
  agents: Agent[];
  loading: boolean;
  error: string | null;
  agentLoadingStates: Record<string, boolean>; // Individual agent loading states
}

const initialState: AgentState = {
  agents: [],
  loading: false,
  error: null,
  agentLoadingStates: {},
};

// Async thunk for fetching agents
export const fetchAgents = createAsyncThunk(
  "agents/fetchAgents",
  async (_, { rejectWithValue }) => {
    try {
      const agents = await agentService.getAgents();
      return agents;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch agents"
      );
    }
  }
);

// Async thunk for updating agent status
export const updateAgentStatus = createAsyncThunk(
  "agents/updateAgentStatus",
  async (
    {
      agentId,
      status,
    }: { agentId: string; status: "Running" | "Idle" | "Error" },
    { rejectWithValue }
  ) => {
    try {
      const updatedAgent = await agentService.updateAgentStatus(
        agentId,
        status
      );
      return updatedAgent;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to update agent status"
      );
    }
  }
);

// Async thunk for deleting an agent
export const deleteAgent = createAsyncThunk(
  "agents/deleteAgent",
  async (agentId: string, { rejectWithValue }) => {
    try {
      await agentService.deleteAgent(agentId);
      return agentId;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to delete agent"
      );
    }
  }
);

export const agentSlice = createSlice({
  name: "agents",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearAgents: (state) => {
      state.agents = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch agents
    builder
      .addCase(fetchAgents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAgents.fulfilled, (state, action) => {
        state.loading = false;
        state.agents = action.payload;
        state.error = null;
      })
      .addCase(fetchAgents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update agent status
      .addCase(updateAgentStatus.pending, (state, action) => {
        // Set individual agent loading state instead of global loading
        const { agentId } = action.meta.arg;
        state.agentLoadingStates[agentId] = true;
        state.error = null;
      })
      .addCase(updateAgentStatus.fulfilled, (state, action) => {
        const updatedAgent = action.payload;
        const index = state.agents.findIndex(
          (agent) => agent.id === updatedAgent.id
        );
        if (index !== -1) {
          state.agents[index] = updatedAgent;
        }
        // Clear individual agent loading state
        state.agentLoadingStates[updatedAgent.id] = false;
        state.error = null;
      })
      .addCase(updateAgentStatus.rejected, (state, action) => {
        // Clear individual agent loading state on error
        const { agentId } = action.meta.arg;
        state.agentLoadingStates[agentId] = false;
        state.error = action.payload as string;
      })
      // Delete agent
      .addCase(deleteAgent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAgent.fulfilled, (state, action) => {
        state.loading = false;
        const deletedAgentId = action.payload;
        state.agents = state.agents.filter(
          (agent) => agent.id !== deletedAgentId
        );
        state.error = null;
      })
      .addCase(deleteAgent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearAgents } = agentSlice.actions;
export default agentSlice.reducer;
