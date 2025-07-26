// API and data services

import type { Agent, ExecutionRecord } from "@/types";
import { mockAgents, mockExecutionRecords } from "@/constants/mockData";

/**
 * Simulate API delay
 */
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Agent service - handles agent-related operations
 */
export const agentService = {
  // Get all agents
  async getAgents(): Promise<Agent[]> {
    await delay(500); // Simulate API call
    return mockAgents;
  },

  // Get agent by ID
  async getAgentById(id: string): Promise<Agent | null> {
    await delay(300);
    return mockAgents.find((agent) => agent.id === id) || null;
  },

  // Get execution records for an agent
  async getExecutionRecords(agentId: string): Promise<ExecutionRecord[]> {
    await delay(400);
    return mockExecutionRecords[agentId] || [];
  },

  // Update agent status
  async updateAgentStatus(
    agentId: string,
    status: "Running" | "Idle" | "Error"
  ): Promise<Agent> {
    await delay(2000);
    const agent = mockAgents.find((a) => a.id === agentId);
    if (!agent) throw new Error("Agent not found");

    return { ...agent, status };
  },

  // Delete an agent
  async deleteAgent(agentId: string): Promise<void> {
    await delay(1000);
    const agent = mockAgents.find((a) => a.id === agentId);
    if (!agent) throw new Error("Agent not found");

    // In a real application, this would make an API call to delete the agent
    // For now, we just simulate the deletion
  },
};
