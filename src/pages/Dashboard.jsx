
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./Dashboard.css";

function Dashboard({ selected, setSelected }) {
  const products = [
    { id: 1, name: "HP Pavilion 15", stock: 10, minStock: 5 },
    { id: 2, name: "Logitech G502", stock: 0, minStock: 3 },
    { id: 3, name: "HyperX Cloud II", stock: 2, minStock: 5 }
  ];

  const movements = [
    {
      id: 1,
      product: "HP Pavilion 15",
      type: "Entrée",
      quantity: 10,
      date: "13/11/2026"
    },
    {
      id: 2,
      product: "Logitech G502",
      type: "Sortie",
      quantity: 2,
      date: "12/11/2026"
    },
    {
      id: 3,
      product: "HyperX Cloud II",
      type: "Entrée",
      quantity: 5,
      date: "11/11/2026"
    }
  ];

  const outOfStock = products.filter(
    (product) => product.stock === 0
  ).length;

  const lowStock = products.filter(
    (product) =>
      product.stock > 0 && product.stock <= product.minStock
  ).length;

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
                {movements.map((movement) => (
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
