import "./Sidebar.css";
import { useAuth } from "../context/useAuth";

function Sidebar({ selected, setSelected }) {
  const { user } = useAuth();

  const menuItems = [
    { name: "Profile", label: "Mon profil" },
    { name: "Products", label: "Produits" },
    { name: "Categories", label: "Catégories" },
    { name: "Suppliers", label: "Fournisseurs" },
    { name: "StockMovements", label: "Mouvements de stock" },
    { name: "Inventory", label: "Inventaire" },
    { name: "Dashboard", label: "Tableau de bord" },
    { name: "Statistics", label: "Statistiques", adminOnly: true },
    { name: "Utilisateurs", label: "Utilisateurs", adminOnly: true }
  ];

  const isAdmin = user?.role === "Administrateur";

  const visibleItems = menuItems.filter((item) => isAdmin || !item.adminOnly);

  return (
    <aside className="sidebar">
      <ul>
        {visibleItems.map((item) => (
          <li
            key={item.name}
            className={selected === item.name ? "active" : ""}
            onClick={() => setSelected(item.name)}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;