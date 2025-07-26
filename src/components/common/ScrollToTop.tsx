import React from "react";
import { useScrollToTop } from "../../hooks";

/**
 * Component that automatically scrolls to the top of the page
 * whenever the route changes. This component doesn't render anything
 * but uses the useScrollToTop hook to handle the scrolling behavior.
 */
const ScrollToTop: React.FC = () => {
  useScrollToTop();

  // This component doesn't render anything
  return null;
};

export default ScrollToTop;
