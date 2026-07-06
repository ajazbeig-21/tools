export default function AdminPanel() {
  return (
    <div className="grid md:grid-cols-2 gap-5">

      <div className="card bg-base-100 shadow">

        <div className="card-body">

          <h2 className="card-title">
            Manage Users
          </h2>

          <button className="btn btn-primary">
            Open
          </button>

        </div>

      </div>

      <div className="card bg-base-100 shadow">

        <div className="card-body">

          <h2 className="card-title">
            Manage Roles
          </h2>

          <button className="btn btn-primary">
            Open
          </button>

        </div>

      </div>

    </div>
  );
}