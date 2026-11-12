
import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Table from "../components/Table";
import "./Categories.css";

const columns = [
  { title: "Nom de la catégorie", key: "name" },
  { title: "Nombre de produits", key: "productsCount" }
];

function Categories({
  selected,
  setSelected,
  categories,
  setCategories,
  onEditCategory
}) {
  const [showForm, setShowForm] = useState(false);
  const [categoryName, setCategoryName] = useState("");

  function handleAdd() {
    if (categoryName.trim() === "") {
      alert("Veuillez saisir un nom.");
      return;
    }

    const alreadyExists = categories.some(
      (category) =>
        category.name.toLowerCase() === categoryName.trim().toLowerCase()
    );

    if (alreadyExists) {
      alert("Cette catégorie existe déjà.");
      return;
    }

    const newCategory = {
      id: Date.now(),
      name: categoryName.trim(),
      productsCount: 0
    };

    setCategories([...categories, newCategory]);
    handleCancel();
  }

  function handleDelete(id) {
    const category = categories.find((item) => item.id === id);

    if (category.productsCount > 0) {
      alert("Impossible de supprimer une catégorie qui contient des produits.");
      return;
    }

    setCategories(categories.filter((item) => item.id !== id));
  }

  function handleCancel() {
    setShowForm(false);
    setCategoryName("");
  }

  return (
    <>
      <Navbar />

      <div className="content">
        <Sidebar selected={selected} setSelected={setSelected} />

        <main>
          <div className="header">
            <div>
              <h1>Catégories</h1>
              <p>Gérez les catégories de vos produits ici.</p>
            </div>

            <button onClick={() => setShowForm(!showForm)}>
              Ajouter une catégorie
            </button>
          </div>

          {showForm && (
            <div className="category-form">
              <label>Nom de la catégorie</label>

              <input
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Ex : Écrans"
              />

              <button onClick={handleAdd}>Ajouter</button>
              <button onClick={handleCancel}>Annuler</button>
            </div>
          )}

          {categories.length > 0 ? (
            <div className="categories-table">
              <Table
                data={categories}
                columns={columns}
                onEdit={onEditCategory}
                onDelete={handleDelete}
              />
            </div>
          ) : (
            <div className="empty">
              <h2>Aucune catégorie pour le moment</h2>
              <p>Cliquez sur le bouton ci-dessus pour ajouter une catégorie.</p>
            </div>
          )}
        </main>
      </div>
    </>
  );
}

export default Categories;
