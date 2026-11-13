
import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Searchbar from "../components/Searchbar";
import Table from "../components/Table";
import "./StockMovements.css";

const columns = [
  { title: "Date", key: "date" },
  { title: "Produit", key: "product" },
  { title: "Type", key: "type" },
  { title: "Quantité", key: "quantity" },
  { title: "Effectué par", key: "user" }
];

function StockMovements({ selected, setSelected }) {
  const [movements, setMovements] = useState([
    {
      id: 1,
      date: "13/11/2026",
      product: "HP Pavilion 15",
      type: "Entrée",
      quantity: 10,
      user: "Admin"
    },
    {
      id: 2,
      date: "12/11/2026",
      product: "Logitech G502",
      type: "Sortie",
      quantity: 2,
      user: "Gestionnaire"
    },
    {
      id: 3,
      date: "11/11/2026",
      product: "HyperX Cloud II",
      type: "Entrée",
      quantity: 5,
      user: "Admin"
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [product, setProduct] = useState("");
  const [type, setType] = useState("Entrée");
  const [quantity, setQuantity] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("Tous");

  // Temporary user until login is connected
  const currentUser = "Admin";

  function handleAdd() {
    if (
      product.trim() === "" ||
      quantity === "" ||
      Number(quantity) <= 0
    ) {
      alert("Veuillez remplir tous les champs correctement.");
      return;
    }

    const newMovement = {
      id: Date.now(),
      date: new Date().toLocaleDateString("fr-FR"),
      product,
      type,
      quantity: Number(quantity),
      user: currentUser
    };

    setMovements([newMovement, ...movements]);
    handleCancel();
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

    return matchesSearch && matchesType;
  });

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

              <div className="movementfilters">
                <Searchbar
                  placeholder="Rechercher un produit..."
                  value={searchTerm}
                  onChange={setSearchTerm}
                />

                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <option value="Tous">Tous les mouvements</option>
                  <option value="Entrée">Entrées</option>
                  <option value="Sortie">Sorties</option>
                </select>
              </div>

              {filteredMovements.length > 0 ? (
                <div className="movementtable">
                  <Table
                    data={filteredMovements}
                    columns={columns}
                  />
                </div>
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
