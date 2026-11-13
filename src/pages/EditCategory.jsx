
import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Table from "../components/Table";
import Searchbar from "../components/Searchbar";
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
  const [categoryForm, setCategoryForm] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  function handleSave(e) {
    e.preventDefault();

    if (categoryForm.name.trim() === "") {
      alert("Veuillez saisir un nom.");
      return;
    }

    const alreadyExists = categories.some(
      (category) =>
        category.name.toLowerCase() ===
        categoryForm.name.trim().toLowerCase()
    );

    if (alreadyExists) {
      alert("Cette catégorie existe déjà.");
      return;
    }

    const newCategory = {
      id: Date.now(),
      name: categoryForm.name.trim(),
      productsCount: 0
    };

    setCategories([...categories, newCategory]);
    setCategoryForm(null);
  }

  function handleDelete(id) {
    const category = categories.find((item) => item.id === id);

    if (category.productsCount > 0) {
      alert("Impossible de supprimer une catégorie qui contient des produits.");
      return;
    }

    setCategories(categories.filter((item) => item.id !== id));
  }

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />

      <div className="content">
        <Sidebar selected={selected} setSelected={setSelected} />

        <main>
          {categoryForm ? (
            <>
              <div className="header">
                <div>
                  <h1>Ajouter une catégorie</h1>
                  <p>Ajoutez une nouvelle catégorie de produits.</p>
                </div>
              </div>

              <div className="categoryform">
                <form onSubmit={handleSave}>
                  <label>Nom de la catégorie</label>

                  <input
                    type="text"
                    value={categoryForm.name}
                    onChange={(e) =>
                      setCategoryForm({
                        ...categoryForm,
                        name: e.target.value
                      })
                    }
                    placeholder="Ex : Écrans"
                  />

                  <div className="categorybuttons">
                    <button type="submit">Ajouter</button>

                    <button
                      type="button"
                      onClick={() => setCategoryForm(null)}
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
                  <h1>Catégories</h1>
                  <p>Gérez les catégories de vos produits ici.</p>
                </div>

                <button
                  onClick={() => setCategoryForm({ name: "" })}
                >
                  Ajouter une catégorie
                </button>
              </div>

              <Searchbar
                placeholder="Rechercher une catégorie..."
                value={searchTerm}
                onChange={setSearchTerm}
              />

              {categories.length > 0 ? (
                <div className="categories-table">
                  <Table
                    data={filteredCategories}
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
            </>
          )}
        </main>
      </div>
    </>
  );
}

export default Categories;
