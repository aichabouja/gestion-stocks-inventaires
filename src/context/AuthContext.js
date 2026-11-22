
import { createContext, useState, createElement } from "react";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  function login(username, password) {
    if (username === "admin" && password === "admin123") {
      setUser({
        username: "admin",
        name: "Administrateur",
        role: "Administrateur"
      });

      return true;
    }

    return false;
  }

  function logout() {
    setUser(null);
  }

  return createElement(
    AuthContext.Provider,
    { value: { user, login, logout } },
    children
  );
}
