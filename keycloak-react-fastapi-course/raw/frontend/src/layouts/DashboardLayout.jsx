import { NavLink, Outlet } from "react-router-dom";

const navItems = [
  { to: "/", label: "Dashboard", end: true },
  { to: "/employees", label: "Employees" },
  { to: "/reports", label: "Reports" },
  { to: "/admin", label: "Admin Panel" },
  { to: "/profile", label: "Profile" },
];

export default function DashboardLayout() {
  return (
    <div className="drawer lg:drawer-open min-h-screen bg-base-200">
      <input id="sidebar" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col">
        <div className="navbar sticky top-0 z-10 min-h-16 bg-base-100 border-b border-base-300 px-4 lg:px-6">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="sidebar"
              className="btn btn-square btn-ghost"
              aria-label="Open sidebar"
            >
              <span className="text-xl leading-none">=</span>
            </label>
          </div>

          <div className="flex-1 min-w-0">
            <h1 className="truncate text-lg font-semibold text-base-content">
              Keycloak Demo
            </h1>
          </div>

          <div className="avatar placeholder">
            <div className="bg-primary text-primary-content rounded-full w-10 flex items-center justify-center">
              <span>AJ</span>
            </div>
          </div>
        </div>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>

      <div className="drawer-side">
        <label
          htmlFor="sidebar"
          className="drawer-overlay"
          aria-label="Close sidebar"
        />

        <aside className="min-h-full w-72 bg-base-100 border-r border-base-300">
          <div className="px-5 py-5 border-b border-base-300">
            <p className="text-sm font-medium text-base-content/60">
              Employee Portal
            </p>
            <p className="text-xl font-bold text-base-content">
              Keycloak Demo
            </p>
          </div>

          <ul className="menu p-4 gap-1">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    isActive ? "active font-semibold" : undefined
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}

            <li className="mt-4 border-t border-base-300 pt-4">
              <button type="button">Logout</button>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
}
