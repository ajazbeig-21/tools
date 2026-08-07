import {
  createContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import keycloak from "./keycloak";

interface UserProfile {
  id?: string;
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
}

interface AuthContextType {
  authenticated: boolean;
  loading: boolean;
  token?: string;
  user?: UserProfile;
  login: () => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string>();
  const [user, setUser] = useState<UserProfile>();


  // 1. Initialize Keycloak
  useEffect(() => {
    const initializeKeycloak = async () => {
      try {
        const isAuthenticated = await keycloak.init({
          onLoad: "login-required",
          pkceMethod: "S256",
          checkLoginIframe: false,
          redirectUri: window.location.origin + "/",
        });

        setAuthenticated(isAuthenticated);

        if (isAuthenticated) {
          setToken(keycloak.token);

          const profile = await keycloak.loadUserProfile();
          setUser(profile);
        }
      } catch (error) {
        console.error("Keycloak initialization failed:", error);
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    initializeKeycloak();
  }, []);


  // 2. Automatically refresh access token
  useEffect(() => {
    if (!authenticated) return;

    const refreshInterval = window.setInterval(async () => {
      try {
        const refreshed = await keycloak.updateToken(60);

        if (refreshed) {
          console.log("Token refreshed successfully");

          setToken(keycloak.token);
        }
      } catch (error) {
        console.error("Token refresh failed:", error);

        setAuthenticated(false);
        setToken(undefined);

        await keycloak.login({
          redirectUri: window.location.origin + "/",
        });
      }
    }, 30000);

    return () => {
      window.clearInterval(refreshInterval);
    };
  }, [authenticated]);

  const login = () => {
    keycloak.login({
      redirectUri: window.location.origin + "/",
    });
  };


  const logout = () => {
    keycloak.logout({
      redirectUri: window.location.origin + "/",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        loading,
        token,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}