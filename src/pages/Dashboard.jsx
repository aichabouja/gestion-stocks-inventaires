import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./Dashboard.css";

const DEFAULT_MIN_STOCK = 5;

function dateToTime(date) {
  const [day, month, year] = date.split("/");
  return new Date(year, month - 1, day).getTime();
}

function Dashboard({ selected, setSelected, products: allProducts = [], movements = [] }) {
  const products = allProducts.filter(
    (product) => product.status !== "Inactif"
  );

  const outOfStockProducts = products.filter(
    (product) => product.stock === 0
  );

  const lowStockProducts = products.filter(
    (product) =>
      product.stock > 0 &&
      product.stock <= (product.minStock ?? DEFAULT_MIN_STOCK)
  );

  const outOfStock = outOfStockProducts.length;
  const lowStock = lowStockProducts.length;

  const alertProducts = [...outOfStockProducts, ...lowStockProducts];

  const sortedMovements = [...movements].sort(
    (a, b) => dateToTime(b.date) - dateToTime(a.date) || b.id - a.id
  );

  return (
    <>
      <Navbar />

      <div className="content">
        <Sidebar selected={selected} setSelected={setSelected} />

        <main className="dashboard">
          <div className="header">
            <div>
              <h1>Tableau de bord</h1>
              <p>Bienvenue dans votre espace de gestion de stock.</p>
            </div>
          </div>

          <div className="dashboardcards">
            <div className="dashboardcard">
              <p>Total des produits</p>
              <h2>{products.length}</h2>
            </div>

            <div className="dashboardcard">
              <p>Produits en rupture</p>
              <h2>{outOfStock}</h2>
            </div>

            <div className="dashboardcard">
              <p>Stock faible</p>
              <h2>{lowStock}</h2>
            </div>
          </div>

          {alertProducts.length > 0 && (
            <div className="recentmovements">
              <h2>Produits en alerte</h2>

              <table>
                <thead>
                  <tr>
                    <th>Produit</th>
                    <th>Catégorie</th>
                    <th>Stock</th>
                    <th>État</th>
                  </tr>
                </thead>

                <tbody>
                  {alertProducts.map((product) => (
                    <tr key={product.id}>
                      <td>{product.name}</td>
                      <td>{product.category}</td>
                      <td>{product.stock}</td>
                      <td>{product.stock === 0 ? "En rupture" : "Stock faible"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="recentmovements">
            <h2>Derniers mouvements de stock</h2>

            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Produit</th>
                  <th>Type</th>
                  <th>Quantité</th>
                </tr>
              </thead>

              <tbody>
                {sortedMovements.map((movement) => (
                  <tr key={movement.id}>
                    <td>{movement.date}</td>
                    <td>{movement.product}</td>
                    <td>{movement.type}</td>
                    <td>{movement.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </>
  );
}

export default Dashboard;