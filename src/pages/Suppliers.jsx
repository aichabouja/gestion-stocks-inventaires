
import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Table from "../components/Table";


const columns = [
  { title: "Nom du fournisseur", key: "name" },
  { title: "Types de produits fournis", key: "products" },
  { title: "Nombre de produits fournis", key: "productsCount" }
];

function Suppliers({
  selected,
  setSelected,
  suppliers,
  setSuppliers,
  onEditSupplier
}) {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [products, setProducts] = useState("");

  function handleAdd() {
    if (name.trim() === "" || products.trim() === "") {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    const alreadyExists = suppliers.some(
      (supplier) =>
        supplier.name.toLowerCase() === name.trim().toLowerCase()
    );

    if (alreadyExists) {
      alert("Ce fournisseur existe déjà.");
      return;
    }

    const newSupplier = {
      id: Date.now(),
      name: name.trim(),
      products: products.trim(),
      productsCount: 0
    };

    setSuppliers([...suppliers, newSupplier]);
    handleCancel();
  }

  function handleDelete(id) {
    setSuppliers(
      suppliers.filter((supplier) => supplier.id !== id)
    );
  }

  function handleCancel() {
    setShowForm(false);
    setName("");
    setProducts("");
  }

  return (
    <>
      <Navbar />

      <div className="content">
        <Sidebar selected={selected} setSelected={setSelected} />

        <main>
          <div className="header">
            <div>
              <h1>Fournisseurs</h1>
              <p>Gérez vos fournisseurs et les produits qu'ils fournissent.</p>
            </div>

            <button onClick={() => setShowForm(!showForm)}>
              Ajouter un fournisseur
            </button>
          </div>

          {showForm && (
            <div className="supplier-form">
              <label>Nom du fournisseur</label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex : TechDistrib"
              />

              <label>Types de produits fournis</label>

              <input
                type="text"
                value={products}
                onChange={(e) => setProducts(e.target.value)}
                placeholder="Ex : PC portables, écrans"
              />

              <button onClick={handleAdd}>Ajouter</button>
              <button onClick={handleCancel}>Annuler</button>
            </div>
          )}

          {suppliers.length > 0 ? (
            <div className="suppliers-table">
              <Table
                data={suppliers}
                columns={columns}
                onEdit={onEditSupplier}
                onDelete={handleDelete}
              />
            </div>
          ) : (
            <div className="empty">
              <h2>Aucun fournisseur pour le moment</h2>
              <p>Cliquez sur le bouton ci-dessus pour ajouter un fournisseur.</p>
            </div>
          )}
        </main>
      </div>
    </>
  );
}

export default Suppliers;

