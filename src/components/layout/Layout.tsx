import React from "react";
import { useLocation } from "react-router-dom";
import { useTheme } from "../../hooks";
import agentrixLogo from "../../assets/agentrixLogoFinal.png";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { toggleTheme, isDark } = useTheme();
  const location = useLocation();

  // Hide header for workflow page
  const isWorkflowPage = location.pathname === "/workflow";
  const showHeader = !isWorkflowPage;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Conditional Header */}
      {showHeader && (
        <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-14 sm:h-16">
              {/* Logo/Brand */}
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img
                    src={agentrixLogo}
                    alt="Agentrix"
                    className="h-6 sm:h-8 lg:h-8 w-auto"
                  />
                </div>
              </div>

              {/* Theme Toggle */}
              <div className="flex items-center">
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 focus:outline-none "
                  aria-label="Toggle theme"
                >
                  {isDark ? (
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </header>
      )}

      {/* Main Content */}
      <main
        className={`transition-colors duration-200 ${
          isWorkflowPage ? "h-screen" : ""
        }`}
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;
