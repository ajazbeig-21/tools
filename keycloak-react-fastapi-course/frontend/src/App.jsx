import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardLayout from "./layouts/DashboardLayout";

import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Reports from "./pages/Reports";
import AdminPanel from "./pages/AdminPanel";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route element={<DashboardLayout />}>

          <Route index element={<Dashboard />} />

          <Route
            path="employees"
            element={<Employees />}
          />

          <Route
            path="reports"
            element={<Reports />}
          />

          <Route
            path="admin"
            element={<AdminPanel />}
          />

          <Route
            path="profile"
            element={<Profile />}
          />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}