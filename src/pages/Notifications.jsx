import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./Notifications.css";

function Notifications({ selected, setSelected, notifications = [], onClear }) {
  function handleClear() {
    if (window.confirm("Voulez-vous vraiment supprimer toutes les notifications ?")) {
      onClear();
    }
  }

  return (
    <>
      <Navbar />

      <div className="content">
        <Sidebar selected={selected} setSelected={setSelected} />

        <main className="notifications-page">
          <div className="header">
            <div>
              <h1>Notifications</h1>
              <p>Alertes sur les produits qui atteignent leur seuil minimal.</p>
            </div>

            {notifications.length > 0 && (
              <button onClick={handleClear}>Tout effacer</button>
            )}
          </div>

          {notifications.length === 0 ? (
            <div className="empty">
              <h2>Aucune notification</h2>
              <p>Vous serez averti lorsqu'un produit atteint son seuil minimal.</p>
            </div>
          ) : (
            <div className="notifications-list">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`notification-card ${notification.type}`}
                >
                  <p>{notification.message}</p>
                  <span>{notification.date}</span>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  );
}

export default Notifications;