import type { Agent } from "@/types";
import React, { memo, useMemo } from "react";
import { Row, Col, Empty, Alert } from "antd";

import AgentCard from "./AgentCard";
import AgentCardSkeleton from "./AgentCardSkeleton";
interface AgentListProps {
  agents: Agent[];
  loading: boolean;
  error: string | null;
  agentLoadingStates?: Record<string, boolean>;
  onStatusChange?: (
    agentId: string,
    status: "Running" | "Idle" | "Error"
  ) => void;
  onViewDetails?: (agentId: string) => void;
  onWorkflowClick?: (agentId: string) => void;
}

const AgentList: React.FC<AgentListProps> = memo(
  ({
    agents,
    loading,
    error,
    agentLoadingStates = {},
    onStatusChange,
    onViewDetails,
    onWorkflowClick,
  }) => {
    const skeletonArray = useMemo(() => Array.from({ length: 8 }), []);

    if (loading) {
      return (
        <Row gutter={[16, 16]}>
          {skeletonArray.map((_, index) => (
            <Col key={index} xs={24} sm={12} lg={8} xl={6} xxl={4}>
              <AgentCardSkeleton />
            </Col>
          ))}
        </Row>
      );
    }

    if (error) {
      return (
        <Alert
          message="Error Loading Agents"
          description={error}
          type="error"
          showIcon
          className="mb-6"
        />
      );
    }

    if (agents.length === 0) {
      return <Empty description="No agents found" className="py-12" />;
    }

    return (
      <Row gutter={[16, 16]}>
        {agents.map((agent) => (
          <Col key={agent.id} xs={24} sm={12} lg={8} xl={6} xxl={4}>
            <AgentCard
              agent={agent}
              isLoading={agentLoadingStates[agent.id] || false}
              onStatusChange={onStatusChange}
              onViewDetails={onViewDetails}
              onWorkflowClick={onWorkflowClick}
            />
          </Col>
        ))}
      </Row>
    );
  }
);

AgentList.displayName = "AgentList";

export default AgentList;
