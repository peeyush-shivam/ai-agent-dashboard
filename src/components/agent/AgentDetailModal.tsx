import React, { useState } from "react";
import {
  Modal,
  Tag,
  Space,
  Typography,
  Button,
  Collapse,
  Form,
  Input,
  App,
} from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  SaveOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import type { Agent, ExecutionRecord } from "@/types";
import { formatDate } from "@/utils";

const { Text, Title } = Typography;
const { Panel } = Collapse;
const { TextArea } = Input;

interface AgentDetailModalProps {
  agent: Agent | null;
  executionRecords: ExecutionRecord[];
  visible: boolean;
  onClose: () => void;
  onDelete?: (agentId: string) => void;
}

const AgentDetailModal: React.FC<AgentDetailModalProps> = ({
  agent,
  executionRecords,
  visible,
  onClose,
  onDelete,
}) => {
  const { notification } = App.useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();

  if (!agent) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Running":
        return "success";
      case "Idle":
        return "default";
      case "Error":
        return "error";
      default:
        return "default";
    }
  };

  const getExecutionStatusIcon = (status: string) => {
    return status === "Success" ? (
      <CheckCircleOutlined className="text-green-500" />
    ) : (
      <CloseCircleOutlined className="text-red-500" />
    );
  };

  const handleDelete = () => {
    if (!onDelete) return;
    onDelete(agent.id);
  };

  const handleEdit = () => {
    setIsEditing(true);
    form.setFieldsValue({
      name: agent.name,
      description: agent.description,
    });
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();

      // Show success notification
      notification.success({
        message: "Agent Updated",
        description: `Agent "${values.name}" updated successfully.`,
        duration: 3,
      });

      setIsEditing(false);
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    form.resetFields();
  };

  // Check if dark mode is active
  const isDarkMode = document.documentElement.classList.contains("dark");

  return (
    <Modal
      centered
      title={
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Title level={4} className="!m-0 text-gray-900 dark:text-white">
              {agent.name}
            </Title>
          </div>
        </div>
      }
      open={visible}
      onCancel={onClose}
      footer={
        isEditing
          ? [
              <Button
                key="cancel"
                type="default"
                onClick={handleCancelEdit}
                icon={<CloseOutlined />}
                className="!border-gray-700 !text-gray-700 "
              >
                Cancel
              </Button>,
              <Button
                key="save"
                type="primary"
                onClick={handleSave}
                icon={<SaveOutlined />}
                className="bg-blue-600 border-blue-600 hover:bg-blue-700 hover:border-blue-700 dark:bg-blue-500 dark:border-blue-500 dark:hover:bg-blue-600 dark:hover:border-blue-600"
              >
                Save Changes
              </Button>,
            ]
          : [
              <Button
                key="edit"
                type="primary"
                onClick={handleEdit}
                icon={<EditOutlined />}
                className="bg-blue-600 border-blue-600 hover:bg-blue-700 hover:border-blue-700 dark:bg-blue-500 dark:border-blue-500 dark:hover:bg-blue-600 dark:hover:border-blue-600"
              >
                Edit Agent
              </Button>,
              <Button
                key="delete"
                danger
                onClick={handleDelete}
                icon={<DeleteOutlined />}
                className="border-red-500 text-red-600 hover:text-red-700 hover:border-red-600 dark:text-red-400 dark:border-red-400 dark:hover:text-red-300 dark:hover:border-red-300"
              >
                Delete Agent
              </Button>,
            ]
      }
      width={800}
      className="agent-detail-modal"
      styles={{
        content: {
          backgroundColor: isDarkMode ? "rgb(31 41 55)" : "rgb(255 255 255)", // dark:bg-gray-800 : bg-white
          borderColor: isDarkMode ? "rgb(55 65 81)" : "rgb(229 231 235)", // dark:border-gray-700 : border-gray-200
        },
        header: {
          backgroundColor: isDarkMode ? "rgb(31 41 55)" : "rgb(255 255 255)", // dark:bg-gray-800 : bg-white
          borderColor: isDarkMode ? "rgb(55 65 81)" : "rgb(229 231 235)", // dark:border-gray-700 : border-gray-200
        },
        body: {
          backgroundColor: isDarkMode ? "rgb(31 41 55)" : "rgb(255 255 255)", // dark:bg-gray-800 : bg-white
          color: isDarkMode ? "rgb(243 244 246)" : "rgb(17 24 39)", // dark:text-white : text-gray-900
        },
        footer: {
          backgroundColor: isDarkMode ? "rgb(31 41 55)" : "rgb(255 255 255)", // dark:bg-gray-800 : bg-white
          borderColor: isDarkMode ? "rgb(55 65 81)" : "rgb(229 231 235)", // dark:border-gray-700 : border-gray-200
        },
      }}
    >
      <div className="space-y-6">
        {/* Agent Overview - Reorganized */}
        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
          <Title level={5} className="!m-0 !mb-3 text-gray-900 dark:text-white">
            {isEditing ? "Edit Agent Information" : "Agent Information"}
          </Title>

          {isEditing ? (
            <Form form={form} layout="vertical" className="edit-agent-form">
              <Form.Item
                name="name"
                label="Agent Name"
                rules={[
                  { required: true, message: "Please enter agent name" },
                  { min: 15, message: "Name must be at least 15 characters" },
                  { max: 50, message: "Name must be less than 50 characters" },
                ]}
              >
                <Input
                  placeholder="Enter agent name"
                  className="bg-white dark:bg-gray-600 border-gray-300 dark:border-gray-500 text-gray-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400"
                />
              </Form.Item>

              <Form.Item
                name="description"
                label="Description"
                rules={[
                  { required: true, message: "Please enter agent description" },
                  {
                    min: 30,
                    message: "Description must be at least 30 characters",
                  },
                  {
                    max: 150,
                    message: "Description must be less than 150 characters",
                  },
                ]}
              >
                <TextArea
                  rows={2}
                  placeholder="Enter agent description"
                  className="bg-white dark:bg-gray-600 border-gray-300 dark:border-gray-500 text-gray-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400"
                />
              </Form.Item>
            </Form>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Text className="text-gray-600 dark:text-gray-400 text-sm">
                    Agent ID:
                  </Text>
                  <Text code className="text-gray-900 dark:text-white text-xs">
                    {agent.id}
                  </Text>
                </div>
                <div className="flex items-center justify-between">
                  <Text className="text-gray-600 dark:text-gray-400 text-sm">
                    Created By:
                  </Text>
                  <div className="flex items-center gap-1">
                    <Text className="text-gray-900 dark:text-white text-sm">
                      {agent.createdBy}
                    </Text>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Text className="text-gray-600 dark:text-gray-400 text-sm">
                    Uptime:
                  </Text>
                  <div className="flex items-center gap-1">
                    <Text className="text-gray-900 dark:text-white text-sm">
                      {agent.uptime}
                    </Text>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Text className="text-gray-600 dark:text-gray-400 text-sm">
                    Status:
                  </Text>
                  <Tag color={getStatusColor(agent.status)} className="text-xs">
                    {agent.status}
                  </Tag>
                </div>
                <div className="flex items-center justify-between">
                  <Text className="text-gray-600 dark:text-gray-400 text-sm">
                    Active:
                  </Text>
                  <Tag
                    color={agent.isActive ? "success" : "default"}
                    className="text-xs"
                  >
                    {agent.isActive ? "Active" : "Inactive"}
                  </Tag>
                </div>
                <div className="flex items-center justify-between">
                  <Text className="text-gray-600 dark:text-gray-400 text-sm">
                    Last Active:
                  </Text>
                  <Text className="text-gray-900 dark:text-white text-sm">
                    {formatDate(agent.lastActive)}
                  </Text>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Agent Description - Better organized */}

        {/* Quick Statistics - Compact and organized */}
        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
          <Title level={5} className="!m-0 !mb-3 text-gray-900 dark:text-white">
            Performance Metrics
          </Title>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-600 p-3 rounded-lg border border-gray-200 dark:border-gray-500">
              <Text className="text-gray-600 dark:text-gray-400 text-xs block">
                Total Executions
              </Text>
              <Text strong className="text-lg text-gray-900 dark:text-white">
                {executionRecords.length}
              </Text>
            </div>
            <div className="bg-white dark:bg-gray-600 p-3 rounded-lg border border-gray-200 dark:border-gray-500">
              <Text className="text-gray-600 dark:text-gray-400 text-xs block">
                Success Rate
              </Text>
              <Text strong className="text-lg text-gray-900 dark:text-white">
                {executionRecords.length > 0
                  ? Math.round(
                      (executionRecords.filter((r) => r.status === "Success")
                        .length /
                        executionRecords.length) *
                        100
                    )
                  : 0}
                %
              </Text>
            </div>
          </div>
        </div>

        {/* Execution History - Using Ant Design Collapse */}
        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
          <Title level={5} className="!m-0 !mb-3 text-gray-900 dark:text-white">
            Recent Execution History
          </Title>
          {executionRecords.length > 0 ? (
            <Collapse
              ghost
              size="small"
              accordion
              className="execution-history-collapse"
            >
              {executionRecords.slice(0, 5).map((record) => (
                <Panel
                  key={record.id}
                  header={
                    <div className="flex items-center justify-between w-full">
                      <Space>
                        {getExecutionStatusIcon(record.status)}
                        <Text
                          strong
                          className={
                            record.status === "Success"
                              ? "text-green-600 dark:text-green-400"
                              : "text-red-600 dark:text-red-400"
                          }
                        >
                          {record.status}
                        </Text>
                      </Space>
                      <Text className="text-gray-500 dark:text-gray-300 text-xs">
                        {formatDate(record.timestamp)}
                      </Text>
                    </div>
                  }
                  className="execution-record-panel"
                >
                  {record.logs && (
                    <Text className="text-sm text-gray-700 dark:text-gray-300 block">
                      {record.logs}
                    </Text>
                  )}
                </Panel>
              ))}
            </Collapse>
          ) : (
            <Text className="text-gray-500 dark:text-gray-400">
              No execution records available.
            </Text>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default AgentDetailModal;
