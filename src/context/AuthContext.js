import { createContext, useState, createElement } from "react";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Administrateur",
      username: "admin",
      email: "admin@example.com",
      password: "admin123",
      role: "Administrateur",
      status: "Actif"
    },
    {
      id: 2,
      name: "Gestionnaire Demo",
      username: "gestionnaire",
      email: "gestionnaire@example.com",
      password: "gestionnaire123",
      role: "Gestionnaire",
      status: "Actif"
    }
  ]);

  function login(username, password) {
    const account = users.find(
      (item) =>
        (item.username.toLowerCase() === username.toLowerCase() ||
          item.email.toLowerCase() === username.toLowerCase()) &&
        item.password === password &&
        item.status === "Actif"
    );

    if (!account) {
      return false;
    }

    const userInfo = { ...account };
    delete userInfo.password;

    setUser(userInfo);
    return true;
  }

  function logout() {
    setUser(null);
  }

  return createElement(
    AuthContext.Provider,
    {
      value: {
        user,
        users,
        setUsers,
        login,
        logout
      }
    },
    children
  );
}