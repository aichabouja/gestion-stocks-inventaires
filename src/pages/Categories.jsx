import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Table from "../components/Table";
import Searchbar from "../components/Searchbar";
import Pagination from "../components/Pagination";
import "../components/Filters.css";
import "./Categories.css";

const columns = [
  { title: "Nom de la catégorie", key: "name" },
  { title: "Nombre de produits", key: "productsCount" }
];

const ITEMS_PER_PAGE = 10;

function sortCategories(list, sortBy) {
  const sorted = [...list];

  if (sortBy === "name-asc") {
    sorted.sort((a, b) => a.name.localeCompare(b.name, "fr"));
  } else if (sortBy === "name-desc") {
    sorted.sort((a, b) => b.name.localeCompare(a.name, "fr"));
  } else if (sortBy === "count-desc") {
    sorted.sort((a, b) => b.productsCount - a.productsCount);
  } else if (sortBy === "count-asc") {
    sorted.sort((a, b) => a.productsCount - b.productsCount);
  }

  return sorted;
}

function Categories({
  selected,
  setSelected,
  categories = [],
  setCategories,
  onEditCategory
}) {
  const [categoryForm, setCategoryForm] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [contentFilter, setContentFilter] = useState("Toutes");
  const [sortBy, setSortBy] = useState("name-asc");
  const [page, setPage] = useState(1);

  function changeFilter(setter, value) {
    setter(value);
    setPage(1);
  }

  function handleSave(e) {
    e.preventDefault();

    if (categoryForm.name.trim() === "") {
      alert("Veuillez saisir un nom.");
      return;
    }

    const alreadyExists = categories.some(
      (category) =>
        category.name.toLowerCase() === categoryForm.name.trim().toLowerCase()
    );

    if (alreadyExists) {
      alert("Cette catégorie existe déjà.");
      return;
    }

    const newCategory = {
      id: Math.max(0, ...categories.map((category) => category.id)) + 1,
      name: categoryForm.name.trim(),
      productsCount: 0
    };

    setCategories([...categories, newCategory]);
    setCategoryForm(null);
  }

  function getDeleteError(category) {
    if (category.productsCount > 0) {
      return `Impossible de supprimer « ${category.name} » : ${category.productsCount} produit(s) utilisent encore cette catégorie.`;
    }

    return null;
  }

  function handleDelete(id) {
    setCategories(categories.filter((item) => item.id !== id));
  }

  const filteredCategories = categories.filter((category) => {
    const matchesSearch = category.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesContent =
      contentFilter === "Toutes" ||
      (contentFilter === "avec" && category.productsCount > 0) ||
      (contentFilter === "vides" && category.productsCount === 0);

    return matchesSearch && matchesContent;
  });

  const sortedCategories = sortCategories(filteredCategories, sortBy);

  const totalPages = Math.max(1, Math.ceil(sortedCategories.length / ITEMS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);

  const pageCategories = sortedCategories.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
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

              <div className="filters">
                <Searchbar
                  placeholder="Rechercher une catégorie..."
                  value={searchTerm}
                  onChange={(value) => changeFilter(setSearchTerm, value)}
                />

                <select
                  value={contentFilter}
                  onChange={(e) => changeFilter(setContentFilter, e.target.value)}
                >
                  <option value="Toutes">Toutes les catégories</option>
                  <option value="avec">Avec produits</option>
                  <option value="vides">Vides</option>
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => changeFilter(setSortBy, e.target.value)}
                >
                  <option value="name-asc">Nom (A → Z)</option>
                  <option value="name-desc">Nom (Z → A)</option>
                  <option value="count-desc">Plus de produits</option>
                  <option value="count-asc">Moins de produits</option>
                </select>
              </div>

              {categories.length === 0 ? (
                <div className="empty">
                  <h2>Aucune catégorie pour le moment</h2>
                  <p>Cliquez sur le bouton ci-dessus pour ajouter une catégorie.</p>
                </div>
              ) : sortedCategories.length === 0 ? (
                <div className="empty">
                  <h2>Aucune catégorie trouvée</h2>
                  <p>Essayez de modifier votre recherche ou vos filtres.</p>
                </div>
              ) : (
                <>
                  <div className="categories-table">
                    <Table
                      data={pageCategories}
                      columns={columns}
                      onEdit={onEditCategory}
                      onDelete={handleDelete}
                      getDeleteError={getDeleteError}
                    />
                  </div>

                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={sortedCategories.length}
                    onPageChange={setPage}
                  />
                </>
              )}
            </>
          )}
        </main>
      </div>
    </>
  );
}

export default Categories;