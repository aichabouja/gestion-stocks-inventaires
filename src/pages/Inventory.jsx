
import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Searchbar from "../components/Searchbar";
import "./Inventory.css";

function Inventory({ selected, setSelected }) {
  const [products, setProducts] = useState([
    { id: 1, name: "HP Pavilion 15", theoreticalStock: 10, realStock: "" },
    { id: 2, name: "Logitech G502", theoreticalStock: 10, realStock: "" },
    { id: 3, name: "HyperX Cloud II", theoreticalStock: 5, realStock: "" }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);

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

    setShowResults(false);
  }

  function calculateDifference(product) {
    return Number(product.realStock) - product.theoreticalStock;
  }

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleCalculate() {
    const incomplete = products.some(
      (product) => product.realStock === ""
    );

    if (incomplete) {
      alert("Veuillez saisir le stock réel de tous les produits.");
      return;
    }

    setShowResults(true);
  }

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
              Saisissez la quantité réellement présente pour chaque produit,
              puis calculez les écarts.
            </p>
          </div>

          <Searchbar
            placeholder="Rechercher un produit..."
            value={searchTerm}
            onChange={setSearchTerm}
          />

          {filteredProducts.length > 0 ? (
            <>
              <div className="inventorytable">
                <table>
                  <thead>
                    <tr>
                      <th>Produit</th>
                      <th>Stock théorique</th>
                      <th>Stock réel</th>
                      {showResults && <th>Écart</th>}
                    </tr>
                  </thead>

                  <tbody>
                    {filteredProducts.map((product) => (
                      <tr key={product.id}>
                        <td>{product.name}</td>
                        <td>{product.theoreticalStock}</td>
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

                        {showResults && (
                          <td
                            className={
                              calculateDifference(product) < 0
                                ? "negative"
                                : calculateDifference(product) > 0
                                ? "positive"
                                : ""
                            }
                          >
                            {calculateDifference(product) > 0
                              ? `+${calculateDifference(product)}`
                              : calculateDifference(product)}
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="inventorybuttons">
                <button onClick={handleCalculate}>
                  Calculer les écarts
                </button>
              </div>
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
