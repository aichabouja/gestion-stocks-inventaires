import { useState } from "react";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./context/useAuth";
import { NotificationContext } from "./context/NotificationContext";

import EditProfile from "./pages/EditProfile";
import Products from "./pages/Products";
import Profile from "./pages/Profile";
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
import Notifications from "./pages/Notifications";

function getToday() {
  return new Date().toLocaleDateString("fr-FR");
}

function isLowStock(product) {
  return product.status !== "Inactif" && product.stock <= (product.minStock ?? 5);
}

function createNotification(id, product) {
  const isEmpty = product.stock === 0;

  return {
    id,
    productId: product.id,
    type: isEmpty ? "danger" : "warning",
    message: isEmpty
      ? `« ${product.name} » est en rupture de stock.`
      : `« ${product.name} » a atteint son seuil minimal (stock : ${product.stock}, seuil : ${product.minStock ?? 5}).`,
    date: getToday(),
    read: false
  };
}

const GESTIONNAIRE_FORBIDDEN_PAGES = ["Statistics", "Utilisateurs"];

function AppContent() {
  const { user, users, setUsers, updateProfile } = useAuth();

  const [selected, setSelected] = useState("Products");
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
    { id: 1, reference: "PRD-0001", barcode: "6111000000014", name: "HP Pavilion 15", category: "PC portables", price: 6500, stock: 10, minStock: 5, realStock: "", status: "Actif" },
    { id: 2, reference: "PRD-0002", barcode: "6111000000021", name: "Dell Inspiron 15", category: "PC portables", price: 7200, stock: 8, minStock: 5, realStock: "", status: "Actif" },
    { id: 3, reference: "PRD-0003", barcode: "6111000000038", name: "Lenovo ThinkPad E14", category: "PC portables", price: 8900, stock: 5, minStock: 5, realStock: "", status: "Actif" },
    { id: 4, reference: "PRD-0004", barcode: "6111000000045", name: "Logitech G502", category: "Souris", price: 450, stock: 25, minStock: 5, realStock: "", status: "Actif" },
    { id: 5, reference: "PRD-0005", barcode: "6111000000052", name: "Logitech M185", category: "Souris", price: 120, stock: 40, minStock: 5, realStock: "", status: "Actif" },
    { id: 6, reference: "PRD-0006", barcode: "6111000000069", name: "Redragon K552", category: "Claviers", price: 390, stock: 15, minStock: 5, realStock: "", status: "Actif" },
    { id: 7, reference: "PRD-0007", barcode: "6111000000076", name: "Logitech K120", category: "Claviers", price: 110, stock: 30, minStock: 5, realStock: "", status: "Actif" },
    { id: 8, reference: "PRD-0008", barcode: "6111000000083", name: "HyperX Cloud II", category: "Casques", price: 850, stock: 12, minStock: 5, realStock: "", status: "Actif" },
    { id: 9, reference: "PRD-0009", barcode: "6111000000090", name: "JBL Quantum 100", category: "Casques", price: 420, stock: 18, minStock: 5, realStock: "", status: "Actif" },
    { id: 10, reference: "PRD-0010", barcode: "6111000000106", name: "Samsung 24 pouces", category: "Écrans", price: 1450, stock: 9, minStock: 5, realStock: "", status: "Actif" },
    { id: 11, reference: "PRD-0011", barcode: "6111000000113", name: "LG UltraGear 27", category: "Écrans", price: 2800, stock: 6, minStock: 5, realStock: "", status: "Actif" },
    { id: 12, reference: "PRD-0012", barcode: "6111000000120", name: "Kingston SSD 480GB", category: "SSD", price: 550, stock: 20, minStock: 5, realStock: "", status: "Actif" },
    { id: 13, reference: "PRD-0013", barcode: "6111000000137", name: "Samsung SSD 1TB", category: "SSD", price: 1100, stock: 14, minStock: 5, realStock: "", status: "Actif" },
    { id: 14, reference: "PRD-0014", barcode: "6111000000144", name: "Seagate HDD 1TB", category: "Disques durs", price: 650, stock: 11, minStock: 5, realStock: "", status: "Actif" },
    { id: 15, reference: "PRD-0015", barcode: "6111000000151", name: "Kingston RAM 8GB", category: "Mémoire RAM", price: 280, stock: 22, minStock: 5, realStock: "", status: "Actif" },
    { id: 16, reference: "PRD-0016", barcode: "6111000000168", name: "Corsair RAM 16GB", category: "Mémoire RAM", price: 620, stock: 13, minStock: 5, realStock: "", status: "Actif" },
    { id: 17, reference: "PRD-0017", barcode: "6111000000175", name: "TP-Link Archer C6", category: "Routeurs et réseaux", price: 490, stock: 7, minStock: 5, realStock: "", status: "Actif" },
    { id: 18, reference: "PRD-0018", barcode: "6111000000182", name: "TP-Link USB WiFi", category: "Routeurs et réseaux", price: 160, stock: 19, minStock: 5, realStock: "", status: "Actif" },
    { id: 19, reference: "PRD-0019", barcode: "6111000000199", name: "Canon Pixma TS3440", category: "Imprimantes", price: 850, stock: 4, minStock: 5, realStock: "", status: "Actif" },
    { id: 20, reference: "PRD-0020", barcode: "6111000000205", name: "APC Back-UPS 650VA", category: "Onduleurs", price: 950, stock: 6, minStock: 5, realStock: "", status: "Actif" }
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

  const [notifications, setNotifications] = useState(() =>
    products
      .filter(isLowStock)
      .map((product, index) => createNotification(index + 1, product))
  );

  if (!user) {
    return <Login />;
  }

  const isGestionnaire = user.role === "Gestionnaire";
  const page =
    isGestionnaire && GESTIONNAIRE_FORBIDDEN_PAGES.includes(selected)
      ? "Products"
      : selected;

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  function markAllAsRead() {
    if (unreadCount > 0) {
      setNotifications(
        notifications.map((notification) => ({ ...notification, read: true }))
      );
    }
  }

  function clearNotifications() {
    setNotifications([]);
  }

  function updateProducts(newProducts) {
    const productsToNotify = newProducts.filter((product) => {
      const oldProduct = products.find((item) => item.id === product.id);

      if (!oldProduct || !isLowStock(product)) {
        return false;
      }

      const justBecameLow = !isLowStock(oldProduct);
      const justBecameEmpty = product.stock === 0 && oldProduct.stock !== 0;

      return justBecameLow || justBecameEmpty;
    });

    setProducts(newProducts);

    if (productsToNotify.length > 0) {
      const firstId = Math.max(0, ...notifications.map((item) => item.id)) + 1;

      const newNotifications = productsToNotify.map((product, index) =>
        createNotification(firstId + index, product)
      );

      setNotifications([...newNotifications, ...notifications]);
    }
  }

  const categoriesWithCount = categories.map((category) => ({
    ...category,
    productsCount: products.filter(
      (product) => product.category === category.name
    ).length
  }));

  function handleSaveProfile(updatedProfile) {
    updateProfile(updatedProfile);
    setSelected("Profile");
  }

  function handleSaveSupplier(updatedSupplier) {
    const nameUsed = suppliers.some(
      (supplier) =>
        supplier.id !== updatedSupplier.id &&
        supplier.name.toLowerCase() === updatedSupplier.name.toLowerCase()
    );

    if (nameUsed) {
      alert("Ce fournisseur existe déjà.");
      return;
    }

    setSuppliers(
      suppliers.map((supplier) =>
        supplier.id === updatedSupplier.id ? updatedSupplier : supplier
      )
    );

    setEditingSupplier(null);
    setSelected("Suppliers");
  }

  function handleSaveCategory(updatedCategory) {
    const nameUsed = categories.some(
      (category) =>
        category.id !== updatedCategory.id &&
        category.name.toLowerCase() === updatedCategory.name.toLowerCase()
    );

    if (nameUsed) {
      alert("Une catégorie avec ce nom existe déjà.");
      return;
    }

    const oldCategory = categories.find(
      (category) => category.id === updatedCategory.id
    );

    setCategories(
      categories.map((category) =>
        category.id === updatedCategory.id ? updatedCategory : category
      )
    );

    if (oldCategory && oldCategory.name !== updatedCategory.name) {
      setProducts(
        products.map((product) =>
          product.category === oldCategory.name
            ? { ...product, category: updatedCategory.name }
            : product
        )
      );
    }

    setEditingCategory(null);
    setSelected("Categories");
  }

  return (
    <NotificationContext.Provider value={{ unreadCount, markAllAsRead }}>
      {page === "Products" && (
        <Products
          selected={page}
          setSelected={setSelected}
          products={products}
          setProducts={updateProducts}
          categories={categories}
        />
      )}

      {page === "Profile" && (
        <Profile
          selected={page}
          setSelected={setSelected}
          profile={user}
        />
      )}

      {page === "EditProfile" && (
        <EditProfile
          profile={user}
          setSelected={setSelected}
          onSave={handleSaveProfile}
        />
      )}

      {page === "Categories" && (
        <Categories
          selected={page}
          setSelected={setSelected}
          categories={categoriesWithCount}
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

      {page === "EditSupplier" && editingSupplier && (
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
          setProducts={updateProducts}
          movements={movements}
          setMovements={setMovements}
        />
      )}

      {page === "Inventory" && (
        <Inventory
          selected={page}
          setSelected={setSelected}
          products={products}
          setProducts={updateProducts}
          categories={categories}
        />
      )}

      {page === "Dashboard" && (
        <Dashboard
          selected={page}
          setSelected={setSelected}
          products={products}
          movements={movements}
        />
      )}

      {page === "Notifications" && (
        <Notifications
          selected={page}
          setSelected={setSelected}
          notifications={notifications}
          onClear={clearNotifications}
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
    </NotificationContext.Provider>
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