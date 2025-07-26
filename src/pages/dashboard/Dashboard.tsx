import React, { useState, useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchAgents, updateAgentStatus } from "@/store/slices/agentSlice";
import AgentList from "@/components/agent/AgentList";
import AgentSearch from "@/components/agent/AgentSearch";
import AgentDetailModal from "@/components/agent/AgentDetailModal";
import { agentService } from "@/services";
import { App, Skeleton } from "antd";
import { useNavigate } from "react-router-dom";
import type { Agent, ExecutionRecord } from "@/types";

const Dashboard: React.FC = () => {
  const { notification } = App.useApp();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { agents, loading, error, agentLoadingStates } = useAppSelector(
    (state) => state.agents
  );
  const [filteredAgents, setFilteredAgents] = useState<Agent[]>(agents);

  // Modal state
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [executionRecords, setExecutionRecords] = useState<ExecutionRecord[]>(
    []
  );

  React.useEffect(() => {
    // Only fetch agents if they haven't been loaded yet
    if (agents.length === 0 && !loading) {
      dispatch(fetchAgents());
    }
  }, [dispatch, agents.length, loading]);

  // Update filtered agents when agents change
  React.useEffect(() => {
    setFilteredAgents(agents);
  }, [agents]);

  // Memoize metrics calculation
  const metrics = useMemo(() => {
    const activeAgents = agents.filter(
      (agent) => agent.status === "Running"
    ).length;
    const totalAgents = agents.length;
    const systemHealth =
      totalAgents > 0 ? Math.round((activeAgents / totalAgents) * 100) : 0;

    return { activeAgents, totalAgents, systemHealth };
  }, [agents]);

  // Memoized agent lookup for better performance
  const getAgentById = useCallback(
    (agentId: string) => agents.find((a) => a.id === agentId),
    [agents]
  );

  const handleStatusChange = useCallback(
    async (agentId: string, status: "Running" | "Idle" | "Error") => {
      try {
        await dispatch(updateAgentStatus({ agentId, status })).unwrap();

        // Show success notification based on status change
        const agent = getAgentById(agentId);
        if (agent) {
          if (status === "Running") {
            notification.success({
              message: "Agent Started",
              description: `Agent "${agent.name}" started successfully.`,
              placement: "topRight",
              duration: 3,
            });
          } else if (status === "Idle") {
            notification.info({
              message: "Agent Stopped",
              description: `Agent "${agent.name}" stopped successfully.`,
              placement: "topRight",
              duration: 3,
            });
          }
        }
      } catch (error) {
        console.error("Failed to update agent status:", error);
        notification.error({
          message: "Status Update Failed",
          description: "Failed to update agent status. Please try again.",
          placement: "topRight",
          duration: 3,
        });
      }
    },
    [dispatch, getAgentById, notification]
  );

  const handleDelete = useCallback(
    async (agentId: string) => {
      const agent = getAgentById(agentId);
      if (!agent) return;

      // Show success notification
      notification.success({
        message: "Agent Deleted",
        description: `Agent "${agent.name}" deleted successfully.`,
        placement: "topRight",
        duration: 3,
      });

      // Close modal if the deleted agent was the selected one
      if (selectedAgent?.id === agentId) {
        setModalVisible(false);
        setSelectedAgent(null);
        setExecutionRecords([]);
      }
    },
    [getAgentById, notification, selectedAgent?.id]
  );

  const handleViewDetails = useCallback(
    async (agentId: string) => {
      const agent = getAgentById(agentId);
      if (!agent) return;

      try {
        // Fetch execution records for the agent
        const records = await agentService.getExecutionRecords(agentId);
        setExecutionRecords(records);
        setSelectedAgent(agent);
        setModalVisible(true);
      } catch (error) {
        console.error("Failed to fetch execution records:", error);
        notification.error({
          message: "Load Failed",
          description: "Failed to load agent details. Please try again.",
          placement: "topRight",
          duration: 3,
        });
      }
    },
    [getAgentById, notification]
  );

  const handleWorkflowClick = useCallback(
    (agentId: string) => {
      // Navigate to workflow page with agent ID
      navigate(`/workflow?agentId=${agentId}`);
    },
    [navigate]
  );

  const handleModalClose = useCallback(() => {
    setModalVisible(false);
    setSelectedAgent(null);
    setExecutionRecords([]);
  }, []);

  const handleSearchChange = useCallback((newFilteredAgents: Agent[]) => {
    setFilteredAgents(newFilteredAgents);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200">
      {/* Main container with responsive padding */}
      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Content wrapper with max width and centered alignment */}
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header section with proper spacing */}
          <div className="space-y-4">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
              Dashboard
            </h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-3xl">
              Monitor and manage your AI agents, workflows, and system
              performance
            </p>
          </div>

          {/* Main content area with proper spacing */}
          <div className="space-y-6">
            {/*  Content grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Stats card */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="space-y-3">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Active Agents
                  </h3>
                  {loading ? (
                    <Skeleton.Input active />
                  ) : (
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {metrics.activeAgents}
                    </p>
                  )}
                </div>
              </div>

              {/* Total Agents card */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="space-y-3">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Total Agents
                  </h3>
                  {loading ? (
                    <Skeleton.Input active />
                  ) : (
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {metrics.totalAgents}
                    </p>
                  )}
                </div>
              </div>

              {/* Performance card */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="space-y-3">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    System Health
                  </h3>
                  {loading ? (
                    <Skeleton.Input active />
                  ) : (
                    <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {metrics.systemHealth}%
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Search and Filter Section */}
            {!loading && agents.length > 0 && (
              <AgentSearch
                agents={agents}
                onSearchChange={handleSearchChange}
              />
            )}

            {/* Agents List */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 sm:p-8 lg:p-10 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
                    AI Agents
                  </h2>
                  {/* <div className="text-sm text-gray-600 dark:text-gray-400">
                    {!loading && `${filteredAgents.length} of ${agents.length} agents`}
                  </div> */}
                </div>

                <AgentList
                  agents={filteredAgents}
                  loading={loading}
                  error={error}
                  agentLoadingStates={agentLoadingStates}
                  onStatusChange={handleStatusChange}
                  onViewDetails={handleViewDetails}
                  onWorkflowClick={handleWorkflowClick}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Agent Detail Modal */}
      <AgentDetailModal
        agent={selectedAgent}
        executionRecords={executionRecords}
        visible={modalVisible}
        onClose={handleModalClose}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Dashboard;
