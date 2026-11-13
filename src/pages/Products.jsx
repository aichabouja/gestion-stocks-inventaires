
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Table from "../components/Table";
import EditProduct from "./EditProduct";
import Searchbar from "../components/Searchbar";
import "./Products.css";

const columns = [
  { title: "Nom", key: "name" },
  { title: "Catégorie", key: "category" },
  { title: "Prix (DH)", key: "price" }
];

function Products({ selected, setSelected }) {
  const [products, setProducts] = useState([
    { id: 1, name: "HP Pavilion 15", category: "PC portables", price: 6500 },
    { id: 2, name: "Logitech G502", category: "Souris", price: 450 },
    { id: 3, name: "HyperX Cloud II", category: "Casques", price: 850 }
  ]);

  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  function handleSave(updatedProduct) {
    if (updatedProduct.id) {
      setProducts(products.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      ));
    } else {
      setProducts([...products, {
        ...updatedProduct,
        id: Date.now()
      }]);
    }

    setEditingProduct(null);
  }

  function handleDelete(id) {
    setProducts(products.filter((product) => product.id !== id));
  }

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
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
                    price: ""
                  })}
                >
                  Ajouter un produit
                </button>
              </div>

              <Searchbar
                placeholder="Rechercher un produit..."
                value={searchTerm}
                onChange={setSearchTerm}
              />

              {products.length > 0 ? (
                <div className="products-table">
                  <Table
                    data={filteredProducts}
                    columns={columns}
                    onEdit={setEditingProduct}
                    onDelete={handleDelete}
                  />
                </div>
              ) : (
                <div className="empty">
                  <h2>Aucun produit pour le moment</h2>
                  <p>Cliquez sur le bouton ci-dessus pour ajouter un produit.</p>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </>
  );
}

export default Products;

