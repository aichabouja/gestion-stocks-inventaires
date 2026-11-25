import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Searchbar from "../components/Searchbar";
import Pagination from "../components/Pagination";
import "../components/Filters.css";
import "./Inventory.css";

const ITEMS_PER_PAGE = 10;

function calculateDifference(product) {
  if (product.realStock === "") {
    return 0;
  }

  return Number(product.realStock) - product.stock;
}

function getDifferenceType(product) {
  if (product.realStock === "") {
    return "noncompte";
  }

  const difference = calculateDifference(product);

  if (difference < 0) {
    return "manquant";
  }

  if (difference > 0) {
    return "excedent";
  }

  return "conforme";
}

function Inventory({
  selected,
  setSelected,
  products = [],
  setProducts,
  categories = []
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("Toutes");
  const [differenceFilter, setDifferenceFilter] = useState("Tous");
  const [page, setPage] = useState(1);

  function changeFilter(setter, value) {
    setter(value);
    setPage(1);
  }

  function handleRealStockChange(id, value) {
    if (value !== "" && Number(value) < 0) {
      return;
    }

    setProducts(
      products.map((product) =>
        product.id === id
          ? { ...product, realStock: value }
          : product
      )
    );
  }

  const search = searchTerm.toLowerCase();

  const filteredProducts = products.filter((product) => {
    const isActive = product.status !== "Inactif";

    const matchesSearch =
      product.name.toLowerCase().includes(search) ||
      (product.barcode || "").includes(search);

    const matchesCategory =
      categoryFilter === "Toutes" || product.category === categoryFilter;

    const matchesDifference =
      differenceFilter === "Tous" ||
      getDifferenceType(product) === differenceFilter;

    return isActive && matchesSearch && matchesCategory && matchesDifference;
  });

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);

  const pageProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <>
      <Navbar />

      <div className="content">
        <Sidebar selected={selected} setSelected={setSelected} />

        <main className="inventory">
          <div className="header">
            <div>
              <h1>Inventaire</h1>
              <p>Comparez le stock théorique avec le stock réel.</p>
            </div>
          </div>

          <div className="inventoryinfo">
            <p>
              Saisissez la quantité réellement présente pour un produit,
              l'écart se calcule automatiquement.
            </p>
          </div>

          <div className="filters">
            <Searchbar
              placeholder="Rechercher par nom ou code-barres..."
              value={searchTerm}
              onChange={(value) => changeFilter(setSearchTerm, value)}
            />

            <select
              value={categoryFilter}
              onChange={(e) => changeFilter(setCategoryFilter, e.target.value)}
            >
              <option value="Toutes">Toutes les catégories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>

            <select
              value={differenceFilter}
              onChange={(e) => changeFilter(setDifferenceFilter, e.target.value)}
            >
              <option value="Tous">Tous les écarts</option>
              <option value="noncompte">Non comptés</option>
              <option value="conforme">Sans écart</option>
              <option value="manquant">Manquants (écart négatif)</option>
              <option value="excedent">Excédents (écart positif)</option>
            </select>
          </div>

          {filteredProducts.length > 0 ? (
            <>
              <div className="inventorytable">
                <table>
                  <thead>
                    <tr>
                      <th>Produit</th>
                      <th>Stock théorique</th>
                      <th>Stock réel</th>
                      <th>Écart</th>
                    </tr>
                  </thead>

                  <tbody>
                    {pageProducts.map((product) => {
                      const difference = calculateDifference(product);

                      return (
                        <tr key={product.id}>
                          <td>{product.name}</td>
                          <td>{product.stock}</td>
                          <td>
                            <input
                              type="number"
                              min="0"
                              value={product.realStock}
                              onChange={(e) =>
                                handleRealStockChange(
                                  product.id,
                                  e.target.value
                                )
                              }
                              placeholder="Quantité réelle"
                            />
                          </td>
                          <td
                            className={
                              difference < 0
                                ? "negative"
                                : difference > 0
                                ? "positive"
                                : ""
                            }
                          >
                            {difference > 0 ? `+${difference}` : difference}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={filteredProducts.length}
                onPageChange={setPage}
              />
            </>
          ) : (
            <div className="empty">
              <h2>Aucun produit trouvé</h2>
            </div>
          )}
        </main>
      </div>
    </>
  );
}

export default Inventory;