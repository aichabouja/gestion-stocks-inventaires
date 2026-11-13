
import { useState } from "react";
import "./EditProduct.css";

function EditProduct({ product, onCancel, onSave }) {
  const [name, setName] = useState(product.name || "");
  const [category, setCategory] = useState(product.category || "");
  const [price, setPrice] = useState(product.price || "");

  function handleSubmit(e) {
    e.preventDefault();

    if (name.trim() === "" || category.trim() === "" || price === "") {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    onSave({
      ...product,
      name: name.trim(),
      category: category.trim(),
      price: Number(price)
    });
  }

  return (
    <div className="editproduct">
      <h1>{product.id ? "Modifier un produit" : "Ajouter un produit"}</h1>

      <form onSubmit={handleSubmit}>
        <label>Nom du produit</label>
        <input
          type="text"
          placeholder="Nom du produit"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Catégorie</label>
        <input
          type="text"
          placeholder="Catégorie"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <label>Prix (DH)</label>
        <input
          type="number"
          placeholder="Prix"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <button type="submit">Enregistrer</button>
        <button type="button" onClick={onCancel}>Annuler</button>
      </form>
    </div>
  );
}

export default EditProduct;
