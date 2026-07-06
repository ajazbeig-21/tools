import { useEffect, useState } from "react";

import api from "../api";

export default function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [reports, setReports] = useState([]);
  const [health, setHealth] = useState("Checking");

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [employeesResponse, reportsResponse, healthResponse] =
          await Promise.all([
            api.get("/employees"),
            api.get("/reports"),
            api.get("/health"),
          ]);

        setEmployees(employeesResponse.data);
        setReports(reportsResponse.data);
        setHealth(healthResponse.data.status);
      } catch {
        setHealth("Down");
      }
    }

    loadDashboard();
  }, []);

  return (
    <>
      <h2 className="text-3xl font-bold mb-6">
        Dashboard
      </h2>

      <div className="stats stats-vertical lg:stats-horizontal shadow w-full mb-8">

        <div className="stat">
          <div className="stat-title">Employees</div>
          <div className="stat-value">{employees.length}</div>
        </div>

        <div className="stat">
          <div className="stat-title">Reports</div>
          <div className="stat-value">{reports.length}</div>
        </div>

        <div className="stat">
          <div className="stat-title">API Health</div>
          <div className="stat-value text-2xl">{health}</div>
        </div>

      </div>

      <div className="card bg-base-100 shadow">

        <div className="card-body">

          <h3 className="card-title">
            Employee Snapshot
          </h3>

          <div className="overflow-x-auto">
            <table className="table">

              <thead>
                <tr>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {employees.map((employee) => (
                  <tr key={employee.id}>
                    <td>{employee.name}</td>
                    <td>{employee.role}</td>
                    <td>
                      <span className="badge badge-success">
                        {employee.status}
                      </span>
                    </td>
                  </tr>
                ))}

              </tbody>

            </table>
          </div>

        </div>

      </div>
    </>
  );
}
