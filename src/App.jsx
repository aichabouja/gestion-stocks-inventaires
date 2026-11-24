import { useState } from "react";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./context/useAuth";

import EditProfile from "./pages/EditProfile";
import Products from "./pages/Products";
import Profile from "./pages/Profile";
import EditProduct from "./pages/EditProduct";
import Categories from "./pages/Categories";
import EditCategory from "./pages/EditCategory";
import Suppliers from "./pages/Suppliers";
import EditSupplier from "./pages/EditSupplier";
import StockMovements from "./pages/StockMovements";
import Inventory from "./pages/Inventory";
import Dashboard from "./pages/Dashboard";
import Statistics from "./pages/Statistics";
import Login from "./pages/Login";
import Users from "./pages/Users";

// Pages that a Gestionnaire is NOT allowed to open
const GESTIONNAIRE_FORBIDDEN_PAGES = ["Statistics", "Utilisateurs"];

function AppContent() {
  const { user, users, setUsers } = useAuth();

  const [profile, setProfile] = useState({
    name: "Ahmed",
    email: "ahmed@email.com",
    username: "Ahmed",
    role: "Administrateur"
  });

  const [selected, setSelected] = useState("Products");
  const [editingProduct] = useState(null);
  const [editingSupplier, setEditingSupplier] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);

  const [categories, setCategories] = useState([
    { id: 1, name: "PC portables", productsCount: 0 },
    { id: 2, name: "Ordinateurs de bureau", productsCount: 0 },
    { id: 3, name: "Écrans", productsCount: 0 },
    { id: 4, name: "Claviers", productsCount: 0 },
    { id: 5, name: "Souris", productsCount: 0 },
    { id: 6, name: "Casques", productsCount: 0 },
    { id: 7, name: "Imprimantes", productsCount: 0 },
    { id: 8, name: "Scanners", productsCount: 0 },
    { id: 9, name: "Disques durs", productsCount: 0 },
    { id: 10, name: "SSD", productsCount: 0 },
    { id: 11, name: "Clés USB", productsCount: 0 },
    { id: 12, name: "Cartes graphiques", productsCount: 0 },
    { id: 13, name: "Mémoire RAM", productsCount: 0 },
    { id: 14, name: "Processeurs", productsCount: 0 },
    { id: 15, name: "Cartes mères", productsCount: 0 },
    { id: 16, name: "Alimentations", productsCount: 0 },
    { id: 17, name: "Boîtiers PC", productsCount: 0 },
    { id: 18, name: "Câbles et adaptateurs", productsCount: 0 },
    { id: 19, name: "Routeurs et réseaux", productsCount: 0 },
    { id: 20, name: "Onduleurs", productsCount: 0 }
  ]);

  const [suppliers, setSuppliers] = useState([
    { id: 1, name: "TechDistrib", products: "PC portables, écrans", productsCount: 25 },
    { id: 2, name: "ElectroPro", products: "Souris, claviers", productsCount: 40 },
    { id: 3, name: "AccessInfo", products: "Casques, accessoires", productsCount: 18 },
    { id: 4, name: "MicroTech Solutions", products: "Processeurs, cartes mères, RAM", productsCount: 32 },
    { id: 5, name: "Digital World", products: "PC portables, ordinateurs de bureau", productsCount: 21 },
    { id: 6, name: "InfoPlus Distribution", products: "SSD, disques durs, clés USB", productsCount: 28 },
    { id: 7, name: "PrintPro", products: "Imprimantes, scanners", productsCount: 15 },
    { id: 8, name: "NetConnect", products: "Routeurs, câbles réseau, adaptateurs", productsCount: 19 },
    { id: 9, name: "GamerTech", products: "Cartes graphiques, boîtiers PC", productsCount: 24 },
    { id: 10, name: "PowerSupply Maroc", products: "Alimentations, onduleurs", productsCount: 12 },
    { id: 11, name: "ScreenWorld", products: "Écrans, supports d'écran", productsCount: 16 },
    { id: 12, name: "StoragePro", products: "SSD, disques durs externes", productsCount: 22 },
    { id: 13, name: "OfficeTech", products: "Claviers, souris, casques", productsCount: 30 },
    { id: 14, name: "Hardware Center", products: "Cartes mères, processeurs, RAM", productsCount: 27 },
    { id: 15, name: "CableTech", products: "Câbles HDMI, USB, adaptateurs", productsCount: 14 }
  ]);

  const [products, setProducts] = useState([
    { id: 1, name: "HP Pavilion 15", category: "PC portables", price: 6500, stock: 10, realStock: "" },
    { id: 2, name: "Dell Inspiron 15", category: "PC portables", price: 7200, stock: 8, realStock: "" },
    { id: 3, name: "Lenovo ThinkPad E14", category: "PC portables", price: 8900, stock: 5, realStock: "" },
    { id: 4, name: "Logitech G502", category: "Souris", price: 450, stock: 25, realStock: "" },
    { id: 5, name: "Logitech M185", category: "Souris", price: 120, stock: 40, realStock: "" },
    { id: 6, name: "Redragon K552", category: "Claviers", price: 390, stock: 15, realStock: "" },
    { id: 7, name: "Logitech K120", category: "Claviers", price: 110, stock: 30, realStock: "" },
    { id: 8, name: "HyperX Cloud II", category: "Casques", price: 850, stock: 12, realStock: "" },
    { id: 9, name: "JBL Quantum 100", category: "Casques", price: 420, stock: 18, realStock: "" },
    { id: 10, name: "Samsung 24 pouces", category: "Écrans", price: 1450, stock: 9, realStock: "" },
    { id: 11, name: "LG UltraGear 27", category: "Écrans", price: 2800, stock: 6, realStock: "" },
    { id: 12, name: "Kingston SSD 480GB", category: "SSD", price: 550, stock: 20, realStock: "" },
    { id: 13, name: "Samsung SSD 1TB", category: "SSD", price: 1100, stock: 14, realStock: "" },
    { id: 14, name: "Seagate HDD 1TB", category: "Disques durs", price: 650, stock: 11, realStock: "" },
    { id: 15, name: "Kingston RAM 8GB", category: "Mémoire RAM", price: 280, stock: 22, realStock: "" },
    { id: 16, name: "Corsair RAM 16GB", category: "Mémoire RAM", price: 620, stock: 13, realStock: "" },
    { id: 17, name: "TP-Link Archer C6", category: "Routeurs et réseaux", price: 490, stock: 7, realStock: "" },
    { id: 18, name: "TP-Link USB WiFi", category: "Routeurs et réseaux", price: 160, stock: 19, realStock: "" },
    { id: 19, name: "Canon Pixma TS3440", category: "Imprimantes", price: 850, stock: 4, realStock: "" },
    { id: 20, name: "APC Back-UPS 650VA", category: "Onduleurs", price: 950, stock: 6, realStock: "" }
  ]);

  const [movements, setMovements] = useState([
    { id: 1, date: "13/11/2026", product: "HP Pavilion 15", type: "Entrée", quantity: 10, user: "Admin" },
    { id: 2, date: "13/11/2026", product: "Logitech G502", type: "Entrée", quantity: 25, user: "Admin" },
    { id: 3, date: "14/11/2026", product: "Dell Inspiron 15", type: "Entrée", quantity: 8, user: "Admin" },
    { id: 4, date: "14/11/2026", product: "HyperX Cloud II", type: "Entrée", quantity: 12, user: "Gestionnaire" },
    { id: 5, date: "15/11/2026", product: "Logitech M185", type: "Sortie", quantity: 5, user: "Gestionnaire" },
    { id: 6, date: "15/11/2026", product: "Samsung 24 pouces", type: "Entrée", quantity: 9, user: "Admin" },
    { id: 7, date: "16/11/2026", product: "Kingston SSD 480GB", type: "Sortie", quantity: 3, user: "Gestionnaire" },
    { id: 8, date: "16/11/2026", product: "TP-Link Archer C6", type: "Entrée", quantity: 7, user: "Admin" },
    { id: 9, date: "17/11/2026", product: "Canon Pixma TS3440", type: "Entrée", quantity: 4, user: "Admin" },
    { id: 10, date: "17/11/2026", product: "Corsair RAM 16GB", type: "Sortie", quantity: 2, user: "Gestionnaire" }
  ]);

  if (!user) {
    return <Login />;
  }

  // Decide which page to really show.
  // If a Gestionnaire is on a forbidden page, show "Products" instead.
  // This is calculated during render, so no useEffect is needed.
  const isGestionnaire = user.role === "Gestionnaire";
  const page =
    isGestionnaire && GESTIONNAIRE_FORBIDDEN_PAGES.includes(selected)
      ? "Products"
      : selected;

  function handleSaveProfile(updatedProfile) {
    setProfile(updatedProfile);
    setSelected("Profile");
  }

  function handleSaveSupplier(updatedSupplier) {
    setSuppliers(
      suppliers.map((supplier) =>
        supplier.id === updatedSupplier.id ? updatedSupplier : supplier
      )
    );

    setEditingSupplier(null);
    setSelected("Suppliers");
  }

  function handleSaveCategory(updatedCategory) {
    setCategories(
      categories.map((category) =>
        category.id === updatedCategory.id ? updatedCategory : category
      )
    );

    setEditingCategory(null);
    setSelected("Categories");
  }

  return (
    <>
      {page === "Products" && (
        <Products
          selected={page}
          setSelected={setSelected}
          products={products}
          setProducts={setProducts}
        />
      )}

      {page === "Profile" && (
        <Profile
          selected={page}
          setSelected={setSelected}
          profile={profile}
        />
      )}

      {page === "EditProfile" && (
        <EditProfile
          profile={profile}
          setSelected={setSelected}
          onSave={handleSaveProfile}
        />
      )}

      {page === "EditProduct" && (
        <EditProduct
          product={editingProduct}
          onCancel={() => setSelected("Products")}
          onSave={() => setSelected("Products")}
        />
      )}

      {page === "Categories" && (
        <Categories
          selected={page}
          setSelected={setSelected}
          categories={categories}
          setCategories={setCategories}
          onEditCategory={(category) => {
            setEditingCategory(category);
            setSelected("EditCategory");
          }}
        />
      )}

      {page === "EditCategory" && editingCategory && (
        <EditCategory
          category={editingCategory}
          setSelected={setSelected}
          onCancel={() => setSelected("Categories")}
          onSave={handleSaveCategory}
        />
      )}

      {page === "Suppliers" && (
        <Suppliers
          selected={page}
          setSelected={setSelected}
          suppliers={suppliers}
          setSuppliers={setSuppliers}
          onEditSupplier={(supplier) => {
            setEditingSupplier(supplier);
            setSelected("EditSupplier");
          }}
        />
      )}

      {page === "EditSupplier" && (
        <EditSupplier
          supplier={editingSupplier}
          selected={page}
          setSelected={setSelected}
          onCancel={() => setSelected("Suppliers")}
          onSave={handleSaveSupplier}
        />
      )}

      {page === "StockMovements" && (
        <StockMovements
          selected={page}
          setSelected={setSelected}
          products={products}
          setProducts={setProducts}
          movements={movements}
          setMovements={setMovements}
        />
      )}

      {page === "Inventory" && (
        <Inventory
          selected={page}
          setSelected={setSelected}
          products={products}
          setProducts={setProducts}
        />
      )}

      {page === "Dashboard" && (
        <Dashboard
          selected={page}
          setSelected={setSelected}
        />
      )}

      {page === "Statistics" && (
        <Statistics
          selected={page}
          setSelected={setSelected}
          products={products}
          movements={movements}
        />
      )}

      {page === "Utilisateurs" && (
        <Users
          selected={page}
          setSelected={setSelected}
          users={users}
          setUsers={setUsers}
        />
      )}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;