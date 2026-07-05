import { useEffect, useState } from "react";

import api from "../api";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProfile() {
      try {
        const response = await api.get("/profile");
        setProfile(response.data);
      } catch {
        setError("Unable to load profile.");
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  return (
    <div className="card bg-base-100 shadow max-w-xl">

      <div className="card-body items-center">

        {loading ? (
          <span className="loading loading-spinner loading-md" />
        ) : error ? (
          <div className="alert alert-error">
            <span>{error}</span>
          </div>
        ) : (
          <>
            <div className="avatar placeholder">

              <div className="bg-primary text-white rounded-full w-24 flex items-center justify-center">

                <span className="text-3xl">
                  {profile.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </span>

              </div>

            </div>

            <h2 className="text-2xl font-bold">
              {profile.name}
            </h2>

            <p>{profile.email}</p>
            <p className="text-sm text-base-content/60">
              {profile.department}
            </p>

            <div className="flex gap-2">
              <div className="badge badge-primary">
                {profile.role}
              </div>
              <div className="badge badge-success">
                {profile.status}
              </div>
            </div>
          </>
        )}

      </div>

    </div>
  );
}
