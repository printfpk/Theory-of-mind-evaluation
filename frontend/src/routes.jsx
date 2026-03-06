import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import RunExperiment from "./pages/RunExperiment";
import Results from "./pages/Results";
import ModelComparison from "./pages/ModelComparison";
import Settings from "./pages/Settings";
import Layout from "./components/layout/Layout";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/experiment" element={<RunExperiment />} />
          <Route path="/results" element={<Results />} />
          <Route path="/compare" element={<ModelComparison />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}