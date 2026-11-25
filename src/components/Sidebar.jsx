import { useContext } from "react";
import "./Sidebar.css";
import { useAuth } from "../context/useAuth";
import { NotificationContext } from "../context/NotificationContext";

function Sidebar({ selected, setSelected }) {
  const { user } = useAuth();
  const { unreadCount, markAllAsRead } = useContext(NotificationContext);

  const menuItems = [
    { name: "Profile", label: "Mon profil" },
    { name: "Products", label: "Produits" },
    { name: "Categories", label: "Catégories" },
    { name: "Suppliers", label: "Fournisseurs" },
    { name: "StockMovements", label: "Mouvements de stock" },
    { name: "Inventory", label: "Inventaire" },
    { name: "Dashboard", label: "Tableau de bord" },
    { name: "Notifications", label: "Notifications" },
    { name: "Statistics", label: "Statistiques", adminOnly: true },
    { name: "Utilisateurs", label: "Utilisateurs", adminOnly: true }
  ];

  const isAdmin = user?.role === "Administrateur";

  const visibleItems = menuItems.filter((item) => isAdmin || !item.adminOnly);

  function handleClick(name) {
    if (name === "Notifications") {
      markAllAsRead();
    }

    setSelected(name);
  }

  return (
    <aside className="sidebar">
      <ul>
        {visibleItems.map((item) => (
          <li
            key={item.name}
            className={selected === item.name ? "active" : ""}
            onClick={() => handleClick(item.name)}
          >
            {item.label}
            {item.name === "Notifications" && unreadCount > 0 && (
              <span className="sidebar-badge">{unreadCount}</span>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;