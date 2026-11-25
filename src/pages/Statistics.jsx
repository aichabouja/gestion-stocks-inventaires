import { Package, ArrowDownToLine, ArrowUpFromLine } from "lucide-react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./Statistics.css";

function dateToTime(date) {
  const [day, month, year] = date.split("/");
  return new Date(year, month - 1, day).getTime();
}

function Statistics({ selected, setSelected, products = [], movements = [] }) {
  const totalProducts = products.length;

  const entries = movements
    .filter((movement) => movement.type === "Entrée")
    .reduce((total, movement) => total + Number(movement.quantity), 0);

  const exits = movements
    .filter((movement) => movement.type === "Sortie")
    .reduce((total, movement) => total + Number(movement.quantity), 0);

  const totalMovements = entries + exits;

  const entryPercentage = totalMovements > 0
    ? Math.round((entries / totalMovements) * 100)
    : 0;

  const dates = [...new Set(movements.map((movement) => movement.date))]
    .sort((a, b) => dateToTime(b) - dateToTime(a))
    .slice(0, 5)
    .reverse();

  const chartData = dates.map((date) => {
    const dayMovements = movements.filter(
      (movement) => movement.date === date
    );

    return {
      date,
      entries: dayMovements
        .filter((movement) => movement.type === "Entrée")
        .reduce((total, movement) => total + Number(movement.quantity), 0),
      exits: dayMovements
        .filter((movement) => movement.type === "Sortie")
        .reduce((total, movement) => total + Number(movement.quantity), 0)
    };
  });

  const exitsByProduct = {};

  movements
    .filter((movement) => movement.type === "Sortie")
    .forEach((movement) => {
      exitsByProduct[movement.product] =
        (exitsByProduct[movement.product] || 0) + Number(movement.quantity);
    });

  const topExits = Object.entries(exitsByProduct)
    .map(([name, quantity]) => ({ name, quantity }))
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5);

  const maxExit = Math.max(1, ...topExits.map((item) => item.quantity));

  const lowestStock = products
    .filter((product) => product.status !== "Inactif")
    .sort((a, b) => a.stock - b.stock)
    .slice(0, 5);

  const maxValue = Math.max(
    1,
    ...chartData.map((day) => Math.max(day.entries, day.exits))
  );

  return (
    <>
      <Navbar />

      <div className="content">
        <Sidebar selected={selected} setSelected={setSelected} />

        <main className="statistics">
          <div className="header">
            <div>
              <h1>Statistiques</h1>
              <p>Aperçu rapide de votre stock.</p>
            </div>
          </div>

          <div className="statistics-cards">
            <div className="stat-card">
              <div className="stat-icon blue">
                <Package size={32} />
              </div>
              <div>
                <h2>{totalProducts}</h2>
                <p>Produits au total</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon green">
                <ArrowDownToLine size={32} />
              </div>
              <div>
                <h2>{entries}</h2>
                <p>Entrées</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon red">
                <ArrowUpFromLine size={32} />
              </div>
              <div>
                <h2>{exits}</h2>
                <p>Sorties</p>
              </div>
            </div>
          </div>

          <div className="statistics-charts">
            <div className="chart-card">
              <h2>Mouvements récents</h2>

              <div className="chart-legend">
                <span><i className="legend-entry"></i> Entrées</span>
                <span><i className="legend-exit"></i> Sorties</span>
              </div>

              <div className="bar-chart">
                {chartData.length > 0 ? (
                  chartData.map((day) => (
                    <div className="chart-column" key={day.date}>
                      <div className="bars">
                        <div
                          className="bar entry-bar"
                          style={{ height: `${(day.entries / maxValue) * 100}%` }}
                          title={`Entrées : ${day.entries}`}
                        ></div>

                        <div
                          className="bar exit-bar"
                          style={{ height: `${(day.exits / maxValue) * 100}%` }}
                          title={`Sorties : ${day.exits}`}
                        ></div>
                      </div>

                      <span>{day.date}</span>
                    </div>
                  ))
                ) : (
                  <p className="no-statistics">Aucun mouvement enregistré.</p>
                )}
              </div>
            </div>

            <div className="chart-card distribution-card">
              <h2>Répartition</h2>

              <div
                className="donut-chart"
                style={{
                  background: totalMovements > 0
                    ? `conic-gradient(#3B82F6 0% ${entryPercentage}%, #F59E0B ${entryPercentage}% 100%)`
                    : "#354966"
                }}
              >
                <div className="donut-center">
                  {entryPercentage}%
                </div>
              </div>

              <div className="distribution-legend">
                <p>
                  <span><i className="legend-entry"></i> Entrées</span>
                  <strong>{entryPercentage}%</strong>
                </p>

                <p>
                  <span><i className="legend-exit"></i> Sorties</span>
                  <strong>{100 - entryPercentage}%</strong>
                </p>
              </div>
            </div>
          </div>

          <div className="statistics-rankings">
            <div className="chart-card">
              <h2>Produits les plus sortis</h2>

              {topExits.length > 0 ? (
                <div className="ranking-list">
                  {topExits.map((item, index) => (
                    <div className="ranking-row" key={item.name}>
                      <span className="ranking-position">{index + 1}</span>

                      <div className="ranking-info">
                        <div className="ranking-label">
                          <span>{item.name}</span>
                          <strong>{item.quantity}</strong>
                        </div>

                        <div className="ranking-track">
                          <div
                            className="ranking-bar exit-bar"
                            style={{ width: `${(item.quantity / maxExit) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-statistics">Aucune sortie enregistrée.</p>
              )}
            </div>

            <div className="chart-card">
              <h2>Stock le plus faible</h2>

              {lowestStock.length > 0 ? (
                <div className="ranking-list">
                  {lowestStock.map((product, index) => {
                    const minStock = product.minStock ?? 5;

                    return (
                      <div className="ranking-row" key={product.id}>
                        <span className="ranking-position">{index + 1}</span>

                        <div className="ranking-info">
                          <div className="ranking-label">
                            <span>{product.name}</span>
                            <strong
                              className={
                                product.stock === 0
                                  ? "stock-danger"
                                  : product.stock <= minStock
                                  ? "stock-warning"
                                  : ""
                              }
                            >
                              {product.stock}
                            </strong>
                          </div>

                          <small>Seuil minimal : {minStock}</small>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="no-statistics">Aucun produit.</p>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Statistics;