import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Custom hook that automatically scrolls to the top of the page
 * whenever the route changes (location.pathname changes)
 */
export const useScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top with smooth behavior for better UX
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);
};
