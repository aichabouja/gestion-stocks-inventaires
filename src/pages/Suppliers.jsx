import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Table from "../components/Table";
import Searchbar from "../components/Searchbar";
import Pagination from "../components/Pagination";
import { useAuth } from "../context/useAuth";
import "../components/Filters.css";
import "./Suppliers.css";

const columns = [
  { title: "Nom du fournisseur", key: "name" },
  { title: "Types de produits fournis", key: "products" },
  { title: "Nombre de produits fournis", key: "productsCount" }
];

const ITEMS_PER_PAGE = 10;

function sortSuppliers(list, sortBy) {
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

function Suppliers({
  selected,
  setSelected,
  suppliers = [],
  setSuppliers,
  onEditSupplier
}) {
  const { user } = useAuth();
  const isAdmin = user?.role === "Administrateur";

  const [supplierForm, setSupplierForm] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name-asc");
  const [page, setPage] = useState(1);

  function changeFilter(setter, value) {
    setter(value);
    setPage(1);
  }

  function handleSave(e) {
    e.preventDefault();

    if (
      supplierForm.name.trim() === "" ||
      supplierForm.products.trim() === ""
    ) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    const alreadyExists = suppliers.some(
      (supplier) =>
        supplier.name.toLowerCase() ===
        supplierForm.name.trim().toLowerCase()
    );

    if (alreadyExists) {
      alert("Ce fournisseur existe déjà.");
      return;
    }

    const newSupplier = {
      id: Math.max(0, ...suppliers.map((supplier) => supplier.id)) + 1,
      name: supplierForm.name.trim(),
      products: supplierForm.products.trim(),
      productsCount: 0
    };

    setSuppliers([...suppliers, newSupplier]);
    setSupplierForm(null);
  }

  function handleDelete(id) {
    setSuppliers(
      suppliers.filter((supplier) => supplier.id !== id)
    );
  }

  const search = searchTerm.toLowerCase();

  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.name.toLowerCase().includes(search) ||
    supplier.products.toLowerCase().includes(search)
  );

  const sortedSuppliers = sortSuppliers(filteredSuppliers, sortBy);

  const totalPages = Math.max(1, Math.ceil(sortedSuppliers.length / ITEMS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);

  const pageSuppliers = sortedSuppliers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <>
      <Navbar />

      <div className="content">
        <Sidebar selected={selected} setSelected={setSelected} />

        <main>
          {supplierForm ? (
            <>
              <div className="header">
                <div>
                  <h1>Ajouter un fournisseur</h1>
                  <p>Ajoutez un nouveau fournisseur à votre gestion de stock.</p>
                </div>
              </div>

              <div className="supplierform">
                <form onSubmit={handleSave}>
                  <label>Nom du fournisseur</label>

                  <input
                    type="text"
                    value={supplierForm.name}
                    onChange={(e) =>
                      setSupplierForm({
                        ...supplierForm,
                        name: e.target.value
                      })
                    }
                    placeholder="Ex : TechDistrib"
                  />

                  <label>Types de produits fournis</label>

                  <input
                    type="text"
                    value={supplierForm.products}
                    onChange={(e) =>
                      setSupplierForm({
                        ...supplierForm,
                        products: e.target.value
                      })
                    }
                    placeholder="Ex : PC portables, écrans"
                  />

                  <div className="supplierbuttons">
                    <button type="submit">Ajouter</button>

                    <button
                      type="button"
                      onClick={() => setSupplierForm(null)}
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
                  <h1>Fournisseurs</h1>
                  <p>Gérez vos fournisseurs et les produits qu'ils fournissent.</p>
                </div>

                <button
                  onClick={() =>
                    setSupplierForm({ name: "", products: "" })
                  }
                >
                  Ajouter un fournisseur
                </button>
              </div>

              <div className="filters">
                <Searchbar
                  placeholder="Rechercher par nom ou type de produits..."
                  value={searchTerm}
                  onChange={(value) => changeFilter(setSearchTerm, value)}
                />

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

              {suppliers.length === 0 ? (
                <div className="empty">
                  <h2>Aucun fournisseur pour le moment</h2>
                  <p>Cliquez sur le bouton ci-dessus pour ajouter un fournisseur.</p>
                </div>
              ) : sortedSuppliers.length === 0 ? (
                <div className="empty">
                  <h2>Aucun fournisseur trouvé</h2>
                  <p>Essayez de modifier votre recherche.</p>
                </div>
              ) : (
                <>
                  <div className="suppliers-table">
                    <Table
                      data={pageSuppliers}
                      columns={columns}
                      onEdit={isAdmin ? onEditSupplier : undefined}
                      onDelete={isAdmin ? handleDelete : undefined}
                    />
                  </div>

                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={sortedSuppliers.length}
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

export default Suppliers;