import { useEffect, useState } from "react";

import api from "../api";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    name: "",
    role: "Employee",
    status: "Active",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadEmployees() {
      try {
        const response = await api.get("/employees");
        setEmployees(response.data);
      } catch {
        setError("Unable to load employees.");
      } finally {
        setLoading(false);
      }
    }

    loadEmployees();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const response = await api.post("/employees", form);
      setEmployees((current) => [...current, response.data]);
      setForm({ name: "", role: "Employee", status: "Active" });
    } catch {
      setError("Unable to create employee.");
    }
  };

  const handleDelete = async (employeeId) => {
    setError("");

    try {
      await api.delete(`/employees/${employeeId}`);
      setEmployees((current) =>
        current.filter((employee) => employee.id !== employeeId),
      );
    } catch {
      setError("Unable to delete employee.");
    }
  };

  return (
    <div className="grid gap-6">
      <div className="card bg-base-100 shadow">

        <form className="card-body" onSubmit={handleSubmit}>

          <h2 className="card-title">
            Add Employee
          </h2>

          <div className="grid gap-4 md:grid-cols-4">
            <input
              className="input input-bordered w-full"
              name="name"
              onChange={handleChange}
              placeholder="Name"
              required
              value={form.name}
            />

            <select
              className="select select-bordered w-full"
              name="role"
              onChange={handleChange}
              value={form.role}
            >
              <option>Admin</option>
              <option>Employee</option>
              <option>Manager</option>
            </select>

            <select
              className="select select-bordered w-full"
              name="status"
              onChange={handleChange}
              value={form.status}
            >
              <option>Active</option>
              <option>Working</option>
              <option>Offline</option>
            </select>

            <button className="btn btn-primary" type="submit">
              Add
            </button>
          </div>

          {error && (
            <div className="alert alert-error">
              <span>{error}</span>
            </div>
          )}

        </form>

      </div>

      <div className="card bg-base-100 shadow">

        <div className="card-body">

          <h2 className="card-title">
            Employees
          </h2>

          {loading ? (
            <span className="loading loading-spinner loading-md" />
          ) : (
            <div className="overflow-x-auto">
              <table className="table">

                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th></th>
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
                      <td className="text-right">
                        <button
                          className="btn btn-ghost btn-sm text-error"
                          onClick={() => handleDelete(employee.id)}
                          type="button"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
