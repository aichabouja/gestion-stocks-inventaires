
import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./EditSupplier.css";

function EditSupplier({ supplier, setSelected, onCancel, onSave }) {
  const [name, setName] = useState(supplier.name);
  const [products, setProducts] = useState(supplier.products);

  function handleSubmit(e) {
    e.preventDefault();

    if (name.trim() === "" || products.trim() === "") {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    onSave({
      ...supplier,
      name: name.trim(),
      products: products.trim()
    });
  }

  return (
    <>
      <Navbar />

      <div className="content">
        <Sidebar selected="Suppliers" setSelected={setSelected} />

        <main className="edit-supplier">
          <h1>Modifier un fournisseur</h1>
          <p>Modifiez les informations du fournisseur.</p>

          <form onSubmit={handleSubmit}>
            <label>Nom du fournisseur</label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label>Types de produits fournis</label>

            <input
              type="text"
              value={products}
              onChange={(e) => setProducts(e.target.value)}
            />

            <div className="edit-supplier-buttons">
              <button type="submit">Enregistrer</button>
              <button type="button" onClick={onCancel}>
                Annuler
              </button>
            </div>
          </form>
        </main>
      </div>
    </>
  );
}

export default EditSupplier;
