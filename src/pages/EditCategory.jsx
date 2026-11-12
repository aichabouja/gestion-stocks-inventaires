
import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./EditCategory.css";

function EditCategory({
  category,
  setSelected,
  onCancel,
  onSave
}) {
  const [name, setName] = useState(category.name);

  function handleSubmit(e) {
    e.preventDefault();

    if (name.trim() === "") {
      alert("Veuillez saisir un nom.");
      return;
    }

    onSave({
      ...category,
      name: name.trim()
    });
  }

  return (
    <>
      <Navbar />

      <div className="content">
        <Sidebar selected="Categories" setSelected={setSelected} />

        <main className="edit-category">
          <h1>Modifier une catégorie</h1>
          <p>Modifiez le nom de cette catégorie.</p>

          <form onSubmit={handleSubmit}>
            <label>Nom de la catégorie</label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <div className="edit-category-buttons">
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

export default EditCategory;
