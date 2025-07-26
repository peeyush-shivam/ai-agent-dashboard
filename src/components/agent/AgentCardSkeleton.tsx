import React from "react";
import { Card, Skeleton } from "antd";

const AgentCardSkeleton: React.FC = () => {
  return (
    <Card
      className="agent-card h-full flex flex-col"
      styles={{
        body: {
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "16px",
        },
      }}
      actions={[
        <Skeleton.Button key="action1" active size="small" />,
        <Skeleton.Button key="action2" active size="small" />,
      ]}
    >
      <div className="flex flex-col h-full">
        {/* Header Section */}
        <div className="mb-4 h-[80px]">
          <div className="flex flex-col items-start gap-1">
            <div className="flex items-center gap-2 min-w-0">
              <Skeleton.Avatar active size={40} />
              <div className="flex-1 min-w-0">
                <Skeleton.Input active size="small" style={{ width: "80%" }} />
              </div>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Skeleton.Input active size="small" style={{ width: "60%" }} />
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="flex-1 mb-4">
          <Skeleton
            active
            paragraph={{ rows: 3, width: ["100%", "90%", "80%"] }}
          />
        </div>

        {/* Footer Section */}
        <div className="mt-auto">
          <div className="flex items-center justify-between">
            <Skeleton.Input active size="small" style={{ width: "40%" }} />
            <Skeleton.Input active size="small" style={{ width: "30%" }} />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AgentCardSkeleton;
