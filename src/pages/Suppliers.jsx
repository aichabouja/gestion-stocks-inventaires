
import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Table from "../components/Table";
import Searchbar from "../components/Searchbar";
import "./Suppliers.css";

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
  const [supplierForm, setSupplierForm] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  function handleSave(e) {
    e.preventDefault();

    if (
      supplierForm.name.trim() === "" ||
      supplierForm.products.trim() === ""
    ) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    const alreadyExists = suppliers.some(
      (supplier) =>
        supplier.name.toLowerCase() ===
        supplierForm.name.trim().toLowerCase()
    );

    if (alreadyExists) {
      alert("Ce fournisseur existe déjà.");
      return;
    }

    const newSupplier = {
      id: Date.now(),
      name: supplierForm.name.trim(),
      products: supplierForm.products.trim(),
      productsCount: 0
    };

    setSuppliers([...suppliers, newSupplier]);
    setSupplierForm(null);
  }

  function handleDelete(id) {
    setSuppliers(
      suppliers.filter((supplier) => supplier.id !== id)
    );
  }

  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.products.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />

      <div className="content">
        <Sidebar selected={selected} setSelected={setSelected} />

        <main>
          {supplierForm ? (
            <>
              <div className="header">
                <div>
                  <h1>Ajouter un fournisseur</h1>
                  <p>Ajoutez un nouveau fournisseur à votre gestion de stock.</p>
                </div>
              </div>

              <div className="supplierform">
                <form onSubmit={handleSave}>
                  <label>Nom du fournisseur</label>

                  <input
                    type="text"
                    value={supplierForm.name}
                    onChange={(e) =>
                      setSupplierForm({
                        ...supplierForm,
                        name: e.target.value
                      })
                    }
                    placeholder="Ex : TechDistrib"
                  />

                  <label>Types de produits fournis</label>

                  <input
                    type="text"
                    value={supplierForm.products}
                    onChange={(e) =>
                      setSupplierForm({
                        ...supplierForm,
                        products: e.target.value
                      })
                    }
                    placeholder="Ex : PC portables, écrans"
                  />

                  <div className="supplierbuttons">
                    <button type="submit">Ajouter</button>

                    <button
                      type="button"
                      onClick={() => setSupplierForm(null)}
                    >
                      Annuler
                    </button>
                  </div>
                </form>
              </div>
            </>
          ) : (
            <>
              <div className="header">
                <div>
                  <h1>Fournisseurs</h1>
                  <p>Gérez vos fournisseurs et les produits qu'ils fournissent.</p>
                </div>

                <button
                  onClick={() =>
                    setSupplierForm({ name: "", products: "" })
                  }
                >
                  Ajouter un fournisseur
                </button>
              </div>

              <Searchbar
                placeholder="Rechercher un fournisseur..."
                value={searchTerm}
                onChange={setSearchTerm}
              />

              {suppliers.length > 0 ? (
                <div className="suppliers-table">
                  <Table
                    data={filteredSuppliers}
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
            </>
          )}
        </main>
      </div>
    </>
  );
}

export default Suppliers;

