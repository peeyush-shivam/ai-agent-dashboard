import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/dashboard/Dashboard";
import ScrollToTop from "./components/common/ScrollToTop";
import { App as AntApp } from "antd";
import { Suspense, lazy } from "react";
import { ThemeProvider } from "./components/providers/ThemeProvider";

// Lazy load the Workflow component since it's heavy with ReactFlow
const Workflow = lazy(() => import("./pages/workflow/Workflow"));

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <AntApp>
          <Router>
            <ScrollToTop />
            <Layout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route
                  path="/workflow"
                  element={
                    <Suspense
                      fallback={
                        <div className="flex items-center justify-center h-64">
                          <div className="text-lg">
                            Loading workflow editor...
                          </div>
                        </div>
                      }
                    >
                      <Workflow />
                    </Suspense>
                  }
                />
              </Routes>
            </Layout>
          </Router>
        </AntApp>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
