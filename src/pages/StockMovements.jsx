import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Searchbar from "../components/Searchbar";
import Table from "../components/Table";
import Pagination from "../components/Pagination";
import { useAuth } from "../context/useAuth";
import { api } from "../api";
import "../components/Filters.css";
import "./StockMovements.css";

const columns = [
  { title: "Date", key: "date" },
  { title: "Produit", key: "product" },
  { title: "Type", key: "type" },
  { title: "Quantité", key: "quantity" },
  { title: "Effectué par", key: "user" }
];

function dateToTime(date) {
  const [day, month, year] = date.split("/");
  return new Date(year, month - 1, day).getTime();
}

const ITEMS_PER_PAGE = 10;

function StockMovements({
  selected,
  setSelected,
  products = [],
  movements = [],
  refresh
}) {
  const { user } = useAuth();

  const [showForm, setShowForm] = useState(false);

  const [product, setProduct] = useState("");
  const [type, setType] = useState("Entrée");
  const [quantity, setQuantity] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("Tous");
  const [filterUser, setFilterUser] = useState("Tous");
  const [page, setPage] = useState(1);

  function changeFilter(setter, value) {
    setter(value);
    setPage(1);
  }

  const currentUser = user?.role === "Administrateur" ? "Admin" : "Gestionnaire";

  const activeProducts = products.filter(
    (item) => item.status !== "Inactif"
  );

  async function handleAdd() {
    if (
      product === "" ||
      quantity === "" ||
      Number(quantity) <= 0
    ) {
      alert("Veuillez remplir tous les champs correctement.");
      return;
    }

    try {
      await api("POST", "/stock-movements", {
        productId: Number(product),
        type,
        quantity: Number(quantity)
      });
      await refresh();
      handleCancel();
    } catch (error) {
      alert(error.message);
    }
  }

  function handleCancel() {
    setShowForm(false);
    setProduct("");
    setType("Entrée");
    setQuantity("");
  }

  const filteredMovements = movements.filter((movement) => {
    const matchesSearch = movement.product
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesType =
      filterType === "Tous" || movement.type === filterType;

    const matchesUser =
      filterUser === "Tous" || movement.user === filterUser;

    return matchesSearch && matchesType && matchesUser;
  }).sort(
    (a, b) => dateToTime(b.date) - dateToTime(a.date) || b.id - a.id
  );

  const totalPages = Math.max(1, Math.ceil(filteredMovements.length / ITEMS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);

  const pageMovements = filteredMovements.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <>
      <Navbar />

      <div className="content">
        <Sidebar selected={selected} setSelected={setSelected} />

        <main className="stockmovements">
          {showForm ? (
            <>
              <div className="header">
                <div>
                  <h1>Ajouter un mouvement</h1>
                  <p>Enregistrez une entrée ou une sortie de stock.</p>
                </div>
              </div>

              <div className="movementform">
                <label>Produit</label>
                <select
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                >
                  <option value="">Sélectionner un produit</option>
                  {activeProducts.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name} (stock : {item.stock})
                    </option>
                  ))}
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
                <input type="text" value={currentUser} disabled />

                <div className="movementbuttons">
                  <button onClick={handleAdd}>Enregistrer</button>
                  <button onClick={handleCancel}>Annuler</button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="header">
                <div>
                  <h1>Mouvements de stock</h1>
                  <p>Consultez l'historique des entrées et sorties de produits.</p>
                </div>

                <button onClick={() => setShowForm(true)}>
                  Ajouter un mouvement
                </button>
              </div>

              <div className="filters">
                <Searchbar
                  placeholder="Rechercher un produit..."
                  value={searchTerm}
                  onChange={(value) => changeFilter(setSearchTerm, value)}
                />

                <select
                  value={filterType}
                  onChange={(e) => changeFilter(setFilterType, e.target.value)}
                >
                  <option value="Tous">Tous les mouvements</option>
                  <option value="Entrée">Entrées</option>
                  <option value="Sortie">Sorties</option>
                </select>

                <select
                  value={filterUser}
                  onChange={(e) => changeFilter(setFilterUser, e.target.value)}
                >
                  <option value="Tous">Tous les utilisateurs</option>
                  <option value="Admin">Admin</option>
                  <option value="Gestionnaire">Gestionnaire</option>
                </select>
              </div>

              {filteredMovements.length > 0 ? (
                <>
                  <div className="movementtable">
                    <Table
                      data={pageMovements}
                      columns={columns}
                    />
                  </div>

                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={filteredMovements.length}
                    onPageChange={setPage}
                  />
                </>
              ) : (
                <div className="empty">
                  <h2>Aucun mouvement trouvé</h2>
                  <p>Essayez de modifier votre recherche ou vos filtres.</p>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </>
  );
}

export default StockMovements;
