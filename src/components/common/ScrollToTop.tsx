import React from "react";
import { useScrollToTop } from "@/hooks";

// Component that automatically scrolls to the top of the page the route changes

const ScrollToTop: React.FC = () => {
  useScrollToTop();

  // This component doesn't render anything
  return null;
};

export default ScrollToTop;
