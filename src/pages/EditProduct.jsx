
import "./EditProduct.css";

function EditProduct() {
  return (
    <div className="editproduct">
      <h1>Modifier un produit</h1>

      <form>
        <label>Nom du produit</label>
        <input type="text" placeholder="Nom du produit" />

        <label>Catégorie</label>
        <input type="text" placeholder="Catégorie" />

        <label>Prix (DH)</label>
        <input type="number" placeholder="Prix" />

        <button type="submit">Enregistrer</button>
      </form>
    </div>
  );
}

export default EditProduct;
