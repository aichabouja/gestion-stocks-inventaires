import { useState } from "react";
import "./EditProduct.css";

function EditProduct({ product, categories = [], onCancel, onSave }) {
  const [name, setName] = useState(product.name || "");
  const [category, setCategory] = useState(product.category || "");
  const [price, setPrice] = useState(product.price || "");
  const [barcode, setBarcode] = useState(product.barcode || "");

  const categoryNames = categories.map((item) => item.name);

  if (category !== "" && !categoryNames.includes(category)) {
    categoryNames.push(category);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (
      name.trim() === "" ||
      category.trim() === "" ||
      price === "" ||
      barcode.trim() === ""
    ) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    if (Number(price) < 0) {
      alert("Le prix ne peut pas être négatif.");
      return;
    }

    if (!/^\d{8,13}$/.test(barcode.trim())) {
      alert("Le code-barres doit contenir entre 8 et 13 chiffres.");
      return;
    }

    onSave({
      ...product,
      name: name.trim(),
      category: category.trim(),
      price: Number(price),
      barcode: barcode.trim()
    });
  }

  return (
    <div className="editproduct">
      <h1>{product.id ? "Modifier un produit" : "Ajouter un produit"}</h1>

      <form onSubmit={handleSubmit}>
        <label>Référence</label>
        <input
          type="text"
          value={product.reference || "Générée automatiquement"}
          disabled
        />

        <label>Code-barres</label>
        <input
          type="text"
          inputMode="numeric"
          maxLength={13}
          placeholder="Ex : 6111000000014"
          value={barcode}
          onChange={(e) => setBarcode(e.target.value.replace(/\D/g, ""))}
        />

        <label>Nom du produit</label>
        <input
          type="text"
          placeholder="Nom du produit"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Catégorie</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Sélectionner une catégorie</option>
          {categoryNames.map((categoryName) => (
            <option key={categoryName} value={categoryName}>
              {categoryName}
            </option>
          ))}
        </select>

        <label>Prix (DH)</label>
        <input
          type="number"
          min="0"
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