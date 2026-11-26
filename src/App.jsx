import { useState, useEffect, useCallback } from "react";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./context/useAuth";
import { NotificationContext } from "./context/NotificationContext";
import { api } from "./api";

import EditProfile from "./pages/EditProfile";
import ChangePassword from "./pages/ChangePassword";
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

const GESTIONNAIRE_FORBIDDEN_PAGES = ["Statistics", "Utilisateurs"];

function AppContent() {
  const { user, loading, updateProfile } = useAuth();

  const [selected, setSelected] = useState("Products");
  const [editingSupplier, setEditingSupplier] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);

  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);
  const [movements, setMovements] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [users, setUsers] = useState([]);

  const userId = user?.id;
  const isAdmin = user?.role === "Administrateur";

  const loadData = useCallback(async () => {
    try {
      const [
        productsResponse,
        categoriesResponse,
        suppliersResponse,
        movementsResponse,
        notificationsResponse
      ] = await Promise.all([
        api("GET", "/products"),
        api("GET", "/categories"),
        api("GET", "/suppliers"),
        api("GET", "/stock-movements"),
        api("GET", "/notifications")
      ]);

      setProducts(productsResponse.data);
      setCategories(categoriesResponse.data);
      setSuppliers(suppliersResponse.data);
      setMovements(movementsResponse.data);
      setNotifications(notificationsResponse.data);

      if (isAdmin) {
        const usersResponse = await api("GET", "/users");
        setUsers(usersResponse.data);
      }
    } catch (error) {
      alert(error.message);
    }
  }, [isAdmin]);

  useEffect(() => {
    if (!userId) {
      return;
    }

    let ignore = false;

    async function firstLoad() {
      await Promise.resolve();

      if (!ignore) {
        await loadData();
      }
    }

    firstLoad();

    return () => {
      ignore = true;
    };
  }, [userId, loadData]);

  if (loading) {
    return null;
  }

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
      api("POST", "/notifications/read").catch((error) => alert(error.message));
    }
  }

  async function clearNotifications() {
    try {
      await api("DELETE", "/notifications");
      setNotifications([]);
    } catch (error) {
      alert(error.message);
    }
  }

  async function handleSaveProfile(updatedProfile) {
    try {
      await updateProfile(updatedProfile);
      setSelected("Profile");
    } catch (error) {
      alert(error.message);
    }
  }

  async function handleSaveSupplier(updatedSupplier) {
    try {
      await api("PUT", `/suppliers/${updatedSupplier.id}`, {
        name: updatedSupplier.name,
        products: updatedSupplier.products,
        productsCount: updatedSupplier.productsCount
      });
      await loadData();
      setEditingSupplier(null);
      setSelected("Suppliers");
    } catch (error) {
      alert(error.message);
    }
  }

  async function handleSaveCategory(updatedCategory) {
    try {
      await api("PUT", `/categories/${updatedCategory.id}`, {
        name: updatedCategory.name
      });
      await loadData();
      setEditingCategory(null);
      setSelected("Categories");
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <NotificationContext.Provider value={{ unreadCount, markAllAsRead }}>
      {page === "Products" && (
        <Products
          selected={page}
          setSelected={setSelected}
          products={products}
          categories={categories}
          refresh={loadData}
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

      {page === "ChangePassword" && (
        <ChangePassword setSelected={setSelected} />
      )}

      {page === "Categories" && (
        <Categories
          selected={page}
          setSelected={setSelected}
          categories={categories}
          refresh={loadData}
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
          refresh={loadData}
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
          movements={movements}
          refresh={loadData}
        />
      )}

      {page === "Inventory" && (
        <Inventory
          selected={page}
          setSelected={setSelected}
          products={products}
          setProducts={setProducts}
          categories={categories}
          refresh={loadData}
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
          refresh={loadData}
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
