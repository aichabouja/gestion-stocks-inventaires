import "./Sidebar.css";

function Sidebar({ selected, setSelected }) {
  const menuItems = [
    { name: "Profile", label: "Mon profil" },
    { name: "Products", label: "Produits" },
    { name: "Categories", label: "Catégories" },
    { name: "Suppliers", label: "Fournisseurs" },
    { name: "StockMovements", label: "Mouvements de stock" },
    { name: "Inventory", label: "Inventaire" },
    { name: "Dashboard", label: "Tableau de bord" },
    { name: "Statistics", label: "Statistiques" }
  ];

  return (
    <aside className="sidebar">
      <ul>
        {menuItems.map((item) => (
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