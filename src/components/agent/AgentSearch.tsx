import type { Agent } from "@/types";
import { Input, Select, Card } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import React, { useState, useMemo, useEffect, useCallback } from "react";

const { Search } = Input;
const { Option } = Select;

interface AgentSearchProps {
  agents: Agent[];
  onSearchChange: (filteredAgents: Agent[]) => void;
}

const AgentSearch: React.FC<AgentSearchProps> = ({
  agents,
  onSearchChange,
}) => {
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [creatorFilter, setCreatorFilter] = useState<string>("all");

  // Get unique creators for filter dropdown
  const creators = useMemo(() => {
    const uniqueCreators = [...new Set(agents.map((agent) => agent.createdBy))];
    return uniqueCreators.sort();
  }, [agents]);

  // Filter agents based on search criteria
  const filteredAgents = useMemo(() => {
    return agents.filter((agent) => {
      // Text search (name and description)
      const textMatch =
        searchText === "" ||
        agent.name.toLowerCase().includes(searchText.toLowerCase()) ||
        agent.description.toLowerCase().includes(searchText.toLowerCase());

      // Status filter
      const statusMatch =
        statusFilter === "all" || agent.status === statusFilter;

      // Creator filter
      const creatorMatch =
        creatorFilter === "all" || agent.createdBy === creatorFilter;

      return textMatch && statusMatch && creatorMatch;
    });
  }, [agents, searchText, statusFilter, creatorFilter]);

  // Update parent component when filters change
  useEffect(() => {
    onSearchChange(filteredAgents);
  }, [filteredAgents, onSearchChange]);

  const handleSearch = useCallback((value: string) => {
    setSearchText(value);
  }, []);

  const handleStatusFilter = useCallback((value: string) => {
    setStatusFilter(value);
  }, []);

  const handleCreatorFilter = useCallback((value: string) => {
    setCreatorFilter(value);
  }, []);

  const clearFilters = useCallback(() => {
    setSearchText("");
    setStatusFilter("all");
    setCreatorFilter("all");
  }, []);

  return (
    <Card className="mb-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Search & Filter
          </h3>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {filteredAgents.length} of {agents.length} agents
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Text Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Search Agents
            </label>
            <Search
              placeholder="Search by name or description..."
              value={searchText}
              onChange={(e) => handleSearch(e.target.value)}
              allowClear
              className="w-full"
            />
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Status
            </label>
            <Select
              value={statusFilter}
              onChange={handleStatusFilter}
              className="w-full"
              placeholder="Filter by status"
            >
              <Option value="all">All Status</Option>
              <Option value="Running">Running</Option>
              <Option value="Idle">Idle</Option>
              <Option value="Error">Error</Option>
            </Select>
          </div>

          {/* Creator Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Created By
            </label>
            <Select
              value={creatorFilter}
              onChange={handleCreatorFilter}
              className="w-full"
              placeholder="Filter by creator"
              showSearch
              filterOption={(input, option) =>
                (option?.children as unknown as string)
                  ?.toLowerCase()
                  .includes(input.toLowerCase())
              }
            >
              <Option value="all">All Creators</Option>
              {creators.map((creator) => (
                <Option key={creator} value={creator}>
                  {creator}
                </Option>
              ))}
            </Select>
          </div>
        </div>

        {/* Active Filters Display */}
        {(searchText || statusFilter !== "all" || creatorFilter !== "all") && (
          <div className="flex items-center gap-2 flex-wrap">
            <FilterOutlined className="text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Active filters:
            </span>

            {searchText && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                Search: "{searchText}"
              </span>
            )}

            {statusFilter !== "all" && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                Status: {statusFilter}
              </span>
            )}

            {creatorFilter !== "all" && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                Creator: {creatorFilter}
              </span>
            )}

            <button
              onClick={clearFilters}
              className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 underline"
            >
              Clear all
            </button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default AgentSearch;
