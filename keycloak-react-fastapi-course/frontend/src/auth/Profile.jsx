import { useAuth } from "../auth/useAuth";

export default function Profile() {
  const { user } = useAuth();

  return (
    <div>
      <h1>My Profile</h1>

      <p>
        Name: {user?.firstName} {user?.lastName}
      </p>

      <p>Email: {user?.email}</p>

      <p>Username: {user?.username}</p>
    </div>
  );
}