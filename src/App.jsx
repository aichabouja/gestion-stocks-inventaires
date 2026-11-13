
import { useState } from "react";
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
function App() {
  const [profile, setProfile] = useState({
    name: "Your Name",
    email: "your@email.com",
    username: "username",
    role: "Administrateur"
  });

  const [selected, setSelected] = useState("Products");
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingSupplier, setEditingSupplier] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);

  const [categories, setCategories] = useState([
    { id: 1, name: "PC portables", productsCount: 1 },
    { id: 2, name: "Souris", productsCount: 1 },
    { id: 3, name: "Casques", productsCount: 1 }
  ]);

  const [suppliers, setSuppliers] = useState([
    {
      id: 1,
      name: "TechDistrib",
      products: "PC portables, écrans",
      productsCount: 25
    },
    {
      id: 2,
      name: "ElectroPro",
      products: "Souris, claviers",
      productsCount: 40
    },
    {
      id: 3,
      name: "AccessInfo",
      products: "Casques, accessoires",
      productsCount: 18
    }
  ]);

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
      {selected === "Products" && (
        <Products
          selected={selected}
          setSelected={setSelected}
          setEditingProduct={setEditingProduct}
        />
      )}

      {selected === "Profile" && (
        <Profile
          selected={selected}
          setSelected={setSelected}
          profile={profile}
        />
      )}

      {selected === "EditProfile" && (
        <EditProfile
          profile={profile}
          setSelected={setSelected}
          onSave={handleSaveProfile}
        />
      )}

      {selected === "EditProduct" && (
        <EditProduct
          product={editingProduct}
          onCancel={() => setSelected("Products")}
          onSave={() => setSelected("Products")}
        />
      )}

      {selected === "Categories" && (
        <Categories
          selected={selected}
          setSelected={setSelected}
          categories={categories}
          setCategories={setCategories}
          onEditCategory={(category) => {
            setEditingCategory(category);
            setSelected("EditCategory");
          }}
        />
      )}

      {selected === "EditCategory" && editingCategory && (
        <EditCategory
          category={editingCategory}
          setSelected={setSelected}
          onCancel={() => setSelected("Categories")}
          onSave={handleSaveCategory}
        />
      )}

      {selected === "Suppliers" && (
        <Suppliers
          selected={selected}
          setSelected={setSelected}
          suppliers={suppliers}
          setSuppliers={setSuppliers}
          onEditSupplier={(supplier) => {
            setEditingSupplier(supplier);
            setSelected("EditSupplier");
          }}
        />
      )}

      {selected === "EditSupplier" && (
        <EditSupplier
          supplier={editingSupplier}
          selected={selected}
          setSelected={setSelected}
          onCancel={() => setSelected("Suppliers")}
          onSave={handleSaveSupplier}
        />
      )}
      {selected === "StockMovements" && (
        <StockMovements
          selected={selected}
          setSelected={setSelected}
        />
      )}
      {selected === "Inventory" && (
        <Inventory
          selected={selected}
          setSelected={setSelected}
        />
      )}
    </>
  );
}

export default App;

