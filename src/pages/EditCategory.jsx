
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
  const [name, setName] = useState(category?.name || "");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim()) {
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
        <Sidebar
          selected="Categories"
          setSelected={setSelected}
        />

        <main>
          <div className="header">
            <div>
              <h1>Modifier une catégorie</h1>
              <p>Modifiez les informations de la catégorie.</p>
            </div>
          </div>

          <div className="categoryform">
            <form onSubmit={handleSubmit}>
              <label>Nom de la catégorie</label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nom de la catégorie"
              />

              <div className="categorybuttons">
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

export default EditCategory;


