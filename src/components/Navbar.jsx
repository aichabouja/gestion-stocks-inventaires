import "./Navbar.css";
import { useAuth } from "../context/useAuth";

function Navbar() {
  const { user } = useAuth();

  const roleLabel = user?.role === "Administrateur" ? "ADMIN" : "GESTIONNAIRE";

  return (
    <nav>
      <h2>Stock Management Application</h2>
      {user && <span className="navbar-role">{roleLabel}</span>}
    </nav>
  );
}

export default Navbar;