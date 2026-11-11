import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./Profile.css";

function Profile({ selected, setSelected }) {
  return (
    <>
      <Navbar />
      <div className="content">
        <Sidebar
          selected={selected}
          setSelected={setSelected}
        />

        <main className="profile">
          <h1>Mon profil</h1>
          <p>Gérez les informations de votre compte</p>

          <div className="pcard">
            <h2>Informations personnelles</h2>

            <p><strong>Nom:</strong> Your Name</p>
            <p><strong>Email:</strong> your@email.com</p>
            <p><strong>Nom d'utilisateur:</strong> username</p>
            <p><strong>Rôle:</strong> Gestionnaire de stock</p>

            <button>Modifier le profil</button>
            <button className="changepswd">Changer le mot de passe</button>
          </div>

          <div className="logout">
            <button className="logoutbtn">Déconnexion</button>
          </div>
        </main>
      </div>
    </>
  );
}

export default Profile;