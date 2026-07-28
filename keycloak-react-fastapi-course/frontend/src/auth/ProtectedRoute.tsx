import { Outlet } from "react-router-dom";
import { useAuth } from "./useAuth";

export default function ProtectedRoute() {
  const { authenticated, loading } = useAuth();

  if (loading) {
    return <div>Checking authentication...</div>;
  }

  if (!authenticated) {
    return <div>Authentication failed.</div>;
  }

  return <Outlet />;
}