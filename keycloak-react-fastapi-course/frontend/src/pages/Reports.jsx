import { useEffect, useState } from "react";

import api from "../api";

export default function Reports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadReports() {
      try {
        const response = await api.get("/reports");
        setReports(response.data);
      } catch {
        setError("Unable to load reports.");
      } finally {
        setLoading(false);
      }
    }

    loadReports();
  }, []);

  return (
    <div className="card bg-base-100 shadow">

      <div className="card-body">

        <h2 className="card-title">
          Reports
        </h2>

        {error && (
          <div className="alert alert-error">
            <span>{error}</span>
          </div>
        )}

        {loading ? (
          <span className="loading loading-spinner loading-md" />
        ) : (
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Type</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report) => (
                  <tr key={report.id}>
                    <td>{report.title}</td>
                    <td>{report.type}</td>
                    <td>
                      <span className="badge badge-primary">
                        {report.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>

    </div>
  );
}
