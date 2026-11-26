import { createContext, useState, useEffect, createElement } from "react";
import { api, getToken, setToken } from "../api";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(() => Boolean(getToken()));

  useEffect(() => {
    if (!getToken()) {
      return;
    }

    let ignore = false;

    api("GET", "/me")
      .then((response) => {
        if (!ignore) {
          setUser(response.data);
        }
      })
      .catch(() => {
        setToken(null);
      })
      .finally(() => {
        if (!ignore) {
          setLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, []);

  async function login(username, password) {
    try {
      const response = await api("POST", "/login", {
        login: username.trim(),
        password
      });

      setToken(response.token);
      setUser(response.user);
      return { ok: true };
    } catch (error) {
      return { ok: false, message: error.message };
    }
  }

  async function logout() {
    await api("POST", "/logout").catch(() => null);
    setToken(null);
    setUser(null);
  }

  async function updateProfile(info) {
    const response = await api("PUT", "/profile", info);
    setUser(response.data);
  }

  return createElement(
    AuthContext.Provider,
    {
      value: {
        user,
        loading,
        login,
        logout,
        updateProfile
      }
    },
    children
  );
}
