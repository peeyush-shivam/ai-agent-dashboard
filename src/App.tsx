import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/dashboard/Dashboard";
import Workflow from "./pages/workflow/Workflow";
import { ThemeProvider } from "./components/providers/ThemeProvider";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/workflow" element={<Workflow />} />
            </Routes>
          </Layout>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
