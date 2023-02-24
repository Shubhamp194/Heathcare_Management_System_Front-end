import React from "react";
import routes from "./routes";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "../pages/Landingpage";
import LoginPage from "../pages/LoginPage";
import ReceptionistDashboard from "../pages/ReceptionistDashboard";
import DoctorDashboard from "../pages/DoctorsDashboard";
import NewCasesDashboard from "../pages/NewCasesDashboard";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path={routes.LandingPage} element={<LandingPage />} />
        <Route path={routes.LoginPage} element={<LoginPage />} />
        <Route
          path={routes.ReceptionistDashboard}
          element={<ReceptionistDashboard />}
        />
        <Route path={routes.DoctorDashboard} element={<DoctorDashboard />} />
        <Route path={routes.OPD} element={<NewCasesDashboard />} />
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
