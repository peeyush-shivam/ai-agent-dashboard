import React, { useCallback, useMemo } from "react";
import {
  PlayCircleOutlined,
  PauseCircleOutlined,
  ClockCircleOutlined,
  UserOutlined,
  NodeIndexOutlined,
} from "@ant-design/icons";
import type { Agent } from "@/types";
import { formatDate } from "@/utils";
import { Card, Typography, Tooltip, Button, Avatar } from "antd";

const { Text, Title } = Typography;

interface AgentCardProps {
  agent: Agent;
  isLoading?: boolean;
  onStatusChange?: (
    agentId: string,
    status: "Running" | "Idle" | "Error"
  ) => void;
  onViewDetails?: (agentId: string) => void;
  onWorkflowClick?: (agentId: string) => void;
}

const AgentCard: React.FC<AgentCardProps> = React.memo(
  ({
    agent,
    isLoading = false,
    onStatusChange,
    onViewDetails,
    onWorkflowClick,
  }) => {
    const avatarSeed = useMemo(() => {
      return agent.id.split("-").pop() || "1";
    }, [agent.id]);

    const handleStatusToggle = useCallback(() => {
      if (!onStatusChange) return;

      const newStatus = agent.status === "Running" ? "Idle" : "Running";
      onStatusChange(agent.id, newStatus);
    }, [agent.status, agent.id, onStatusChange]);

    const handleViewDetails = useCallback(() => {
      if (onViewDetails) {
        onViewDetails(agent.id);
      }
    }, [agent.id, onViewDetails]);

    const handleWorkflowClick = React.useCallback(() => {
      if (onWorkflowClick) {
        onWorkflowClick(agent.id);
      }
    }, [agent.id, onWorkflowClick]);

    const avatarUrl = useMemo(() => {
      return `https://api.dicebear.com/7.x/miniavs/svg?seed=${avatarSeed}`;
    }, [avatarSeed]);

    return (
      <Card
        hoverable
        className="agent-card h-full flex flex-col cursor-default"
        styles={{
          body: {
            height: "100%",
            display: "flex",
            flexDirection: "column",
            padding: "16px",
          },
        }}
        actions={[
          <Tooltip
            placement="bottom"
            key="toggle"
            title={agent.status === "Running" ? "Stop Agent" : "Start Agent"}
          >
            <Button
              type="text"
              size="small"
              loading={isLoading}
              icon={
                agent.status === "Running" ? (
                  <PauseCircleOutlined />
                ) : (
                  <PlayCircleOutlined />
                )
              }
              onClick={handleStatusToggle}
              disabled={agent.status === "Error" || isLoading}
              className=" text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
            />
          </Tooltip>,
          <Tooltip placement="bottom" key="workflow" title="Edit Workflow">
            <Button
              type="text"
              size="small"
              icon={<NodeIndexOutlined />}
              onClick={handleWorkflowClick}
              disabled={isLoading}
              className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
            />
          </Tooltip>,
          <Tooltip placement="bottom" key="details" title="View Details">
            <Button
              type="text"
              size="small"
              onClick={handleViewDetails}
              disabled={isLoading}
              className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
            >
              Details
            </Button>
          </Tooltip>,
        ]}
      >
        <div className="flex flex-col h-full">
          <div className="mb-4 h-[80px]">
            <div className="flex flex-col items-start gap-1">
              <div className="flex items-center gap-2 min-w-0">
                <Avatar src={avatarUrl} size={40} />
                <Title
                  level={5}
                  className="!m-0 truncate text-gray-900 dark:text-white"
                >
                  {agent.name}
                </Title>
              </div>
              <Text
                type="secondary"
                className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  lineHeight: "1.4",
                  height: "60px",
                }}
              >
                {agent.description}
              </Text>
            </div>
          </div>

          {/* Agent Details Section - Fixed Height */}
          <div className="flex-grow space-y-3 min-h-[120px]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserOutlined className="text-gray-500 dark:text-gray-400 text-xs" />
                <Text type="secondary" className="text-xs">
                  Created by:
                </Text>
              </div>
              <Text
                strong
                className="text-xs text-gray-900 dark:text-white truncate max-w-[120px]"
              >
                {agent.createdBy}
              </Text>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ClockCircleOutlined className="text-gray-500 dark:text-gray-400 text-xs" />
                <Text type="secondary" className="text-xs">
                  Uptime:
                </Text>
              </div>
              <Text className="text-xs text-gray-900 dark:text-white truncate max-w-[120px]">
                {agent.uptime}
              </Text>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ClockCircleOutlined className="text-gray-500 dark:text-gray-400 text-xs" />
                <Text type="secondary" className="text-xs">
                  Last Active:
                </Text>
              </div>
              <Text className="text-xs text-gray-900 dark:text-white truncate max-w-[120px]">
                {formatDate(agent.lastActive)}
              </Text>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ClockCircleOutlined className="text-gray-500 dark:text-gray-400 text-xs" />
                <Text type="secondary" className="text-xs">
                  Last Execution:
                </Text>
              </div>
              <Text className="text-xs text-gray-900 dark:text-white truncate max-w-[120px]">
                {formatDate(agent.lastExecutionTime)}
              </Text>
            </div>
          </div>

          {/* Active Status Indicator */}
          <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-200 dark:border-gray-700">
            <Text
              type="secondary"
              className="text-xs text-gray-500 dark:text-gray-400"
            >
              Agent Status
            </Text>
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  agent.status === "Running"
                    ? "bg-green-500"
                    : agent.status === "Idle"
                    ? "bg-gray-400"
                    : "bg-red-500"
                }`}
              />
              <Text className="text-xs text-gray-900 dark:text-white">
                {agent.status}
              </Text>
            </div>
          </div>
        </div>
      </Card>
    );
  }
);

AgentCard.displayName = "AgentCard";

export default AgentCard;
