
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./Profile.css";

function Profile({ selected, setSelected, profile }) {
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

            <p><strong>Nom:</strong> {profile.name}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Nom d'utilisateur:</strong> {profile.username}</p>
            <p><strong>Rôle:</strong> {profile.role}</p>

            <button onClick={() => setSelected("EditProfile")}>
              Modifier le profil
            </button>

            <button className="changepswd">
              Changer le mot de passe
            </button>
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
