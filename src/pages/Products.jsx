import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "./Products.css";

function Products({ selected, setSelected }) {
  return (
    <>
      <Navbar />

      <div className="content">
        <Sidebar
          selected={selected}
          setSelected={setSelected}
        />

        <main>
          <div className="header">
            <div>
              <h1>Produits</h1>
              <p>Gérez vos produits ici</p>
            </div>

            <button>Ajouter un produit</button>
          </div>

          <div className="empty">
            <h2>Aucun produit pour le moment</h2>
            <p>Cliquez sur le bouton ci-dessus pour ajouter un produit.</p>
          </div>
        </main>
      </div>
    </>
  );
}

export default Products;