import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Table from "../components/Table";
import EditProduct from "./EditProduct";
import Searchbar from "../components/Searchbar";
import { api } from "../api";
import Pagination from "../components/Pagination";
import "../components/Filters.css";
import "./Products.css";

const columns = [
  { title: "Référence", key: "reference" },
  { title: "Code-barres", key: "barcode" },
  { title: "Nom", key: "name" },
  { title: "Catégorie", key: "category" },
  { title: "Prix (DH)", key: "price" },
  { title: "Stock", key: "stock" },
  { title: "Seuil min", key: "minStock" },
  {
    title: "Statut",
    key: "status",
    render: (product) => (
      <span
        className={
          product.status === "Inactif" ? "status-inactive" : "status-active"
        }
      >
        {product.status}
      </span>
    )
  }
];

const PRODUCTS_PER_PAGE = 10;

function getStockLevel(product) {
  if (product.stock === 0) {
    return "rupture";
  }

  if (product.stock <= (product.minStock ?? 5)) {
    return "faible";
  }

  return "normal";
}

function sortProducts(list, sortBy) {
  const sorted = [...list];

  if (sortBy === "name-asc") {
    sorted.sort((a, b) => a.name.localeCompare(b.name, "fr"));
  } else if (sortBy === "name-desc") {
    sorted.sort((a, b) => b.name.localeCompare(a.name, "fr"));
  } else if (sortBy === "price-asc") {
    sorted.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-desc") {
    sorted.sort((a, b) => b.price - a.price);
  } else if (sortBy === "stock-asc") {
    sorted.sort((a, b) => a.stock - b.stock);
  } else if (sortBy === "stock-desc") {
    sorted.sort((a, b) => b.stock - a.stock);
  }

  return sorted;
}

function Products({ selected, setSelected, products = [], categories = [], refresh }) {
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("Toutes");
  const [stockFilter, setStockFilter] = useState("Tous");
  const [sortBy, setSortBy] = useState("name-asc");
  const [page, setPage] = useState(1);

  function changeFilter(setter, value) {
    setter(value);
    setPage(1);
  }

  async function handleSave(updatedProduct) {
    const body = {
      barcode: updatedProduct.barcode,
      name: updatedProduct.name,
      category: updatedProduct.category,
      price: updatedProduct.price,
      minStock: updatedProduct.minStock
    };

    try {
      if (updatedProduct.id) {
        await api("PUT", `/products/${updatedProduct.id}`, body);
      } else {
        await api("POST", "/products", body);
      }

      await refresh();
      setEditingProduct(null);
    } catch (error) {
      alert(error.message);
    }
  }

  async function handleToggleStatus(id) {
    try {
      await api("PATCH", `/products/${id}/status`);
      await refresh();
    } catch (error) {
      alert(error.message);
    }
  }

  async function handleDelete(id) {
    try {
      await api("DELETE", `/products/${id}`);
      await refresh();
    } catch (error) {
      alert(error.message);
    }
  }

  const search = searchTerm.toLowerCase();

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(search) ||
      (product.barcode || "").includes(search);

    const matchesCategory =
      categoryFilter === "Toutes" || product.category === categoryFilter;

    const matchesStock =
      stockFilter === "Tous" || getStockLevel(product) === stockFilter;

    return matchesSearch && matchesCategory && matchesStock;
  });

  const sortedProducts = sortProducts(filteredProducts, sortBy);

  const totalPages = Math.max(1, Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);

  const pageProducts = sortedProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  return (
    <>
      <Navbar />

      <div className="content">
        <Sidebar selected={selected} setSelected={setSelected} />

        <main>
          {editingProduct ? (
            <EditProduct
              product={editingProduct}
              categories={categories}
              onCancel={() => setEditingProduct(null)}
              onSave={handleSave}
            />
          ) : (
            <>
              <div className="header">
                <div>
                  <h1>Produits</h1>
                  <p>Gérez vos produits ici</p>
                </div>

                <button
                  onClick={() => setEditingProduct({
                    name: "",
                    category: "",
                    price: "",
                    barcode: "",
                    minStock: ""
                  })}
                >
                  Ajouter un produit
                </button>
              </div>

              <div className="filters">
                <Searchbar
                  placeholder="Rechercher par nom ou code-barres..."
                  value={searchTerm}
                  onChange={(value) => changeFilter(setSearchTerm, value)}
                />

                <select
                  value={categoryFilter}
                  onChange={(e) => changeFilter(setCategoryFilter, e.target.value)}
                >
                  <option value="Toutes">Toutes les catégories</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>

                <select
                  value={stockFilter}
                  onChange={(e) => changeFilter(setStockFilter, e.target.value)}
                >
                  <option value="Tous">Tous les niveaux de stock</option>
                  <option value="normal">Stock normal</option>
                  <option value="faible">Stock faible</option>
                  <option value="rupture">En rupture</option>
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => changeFilter(setSortBy, e.target.value)}
                >
                  <option value="name-asc">Nom (A → Z)</option>
                  <option value="name-desc">Nom (Z → A)</option>
                  <option value="price-asc">Prix croissant</option>
                  <option value="price-desc">Prix décroissant</option>
                  <option value="stock-asc">Quantité croissante</option>
                  <option value="stock-desc">Quantité décroissante</option>
                </select>
              </div>

              {products.length === 0 ? (
                <div className="empty">
                  <h2>Aucun produit pour le moment</h2>
                  <p>Cliquez sur le bouton ci-dessus pour ajouter un produit.</p>
                </div>
              ) : sortedProducts.length === 0 ? (
                <div className="empty">
                  <h2>Aucun produit trouvé</h2>
                  <p>Essayez de modifier votre recherche ou vos filtres.</p>
                </div>
              ) : (
                <>
                  <div className="products-table">
                    <Table
                      data={pageProducts}
                      columns={columns}
                      onEdit={setEditingProduct}
                      onToggleStatus={handleToggleStatus}
                      onDelete={handleDelete}
                    />
                  </div>

                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={sortedProducts.length}
                    onPageChange={setPage}
                  />
                </>
              )}
            </>
          )}
        </main>
      </div>
    </>
  );
}

export default Products;
