
import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./StockMovements.css";

function EditStockMovement({
  movement,
  selected,
  setSelected,
  onCancel,
  onSave
}) {
  const [product, setProduct] = useState(movement.product);
  const [type, setType] = useState(movement.type);
  const [quantity, setQuantity] = useState(String(movement.quantity));

  function handleSubmit(e) {
    e.preventDefault();

    if (!product || !quantity || Number(quantity) <= 0) {
      alert("Veuillez remplir tous les champs correctement.");
      return;
    }

    onSave({
      ...movement,
      product,
      type,
      quantity: Number(quantity)
    });
  }

  return (
    <>
      <Navbar />

      <div className="content">
        <Sidebar selected={selected} setSelected={setSelected} />

        <main className="stockmovements">
          <div className="header">
            <div>
              <h1>Modifier un mouvement</h1>
              <p>Modifiez les informations du mouvement de stock.</p>
            </div>
          </div>

          <div className="movementform">
            <form onSubmit={handleSubmit}>
              <label>Produit</label>
              <select
                value={product}
                onChange={(e) => setProduct(e.target.value)}
              >
                <option value="">Sélectionner un produit</option>
                <option value="HP Pavilion 15">HP Pavilion 15</option>
                <option value="Logitech G502">Logitech G502</option>
                <option value="HyperX Cloud II">HyperX Cloud II</option>
              </select>

              <label>Type de mouvement</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="Entrée">Entrée</option>
                <option value="Sortie">Sortie</option>
              </select>

              <label>Quantité</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Ex : 10"
              />

              <label>Effectué par</label>
              <input type="text" value={movement.user} disabled />

              <div className="movementbuttons">
                <button type="submit">Enregistrer</button>

                <button type="button" onClick={onCancel}>
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </>
  );
}

export default EditStockMovement;
