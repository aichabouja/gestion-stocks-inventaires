import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/useAuth";
import "./EditProfile.css";

function EditProfile({ profile, setSelected, onSave }) {
  const { users } = useAuth();

  const [name, setName] = useState(profile.name || "");
  const [email, setEmail] = useState(profile.email || "");
  const [username, setUsername] = useState(profile.username || "");

  function handleSubmit(e) {
    e.preventDefault();

    if (name.trim() === "" || email.trim() === "" || username.trim() === "") {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      alert("Veuillez saisir une adresse email valide.");
      return;
    }

    const usernameUsed = users.some(
      (item) =>
        item.id !== profile.id &&
        item.username.toLowerCase() === username.trim().toLowerCase()
    );

    if (usernameUsed) {
      alert("Ce nom d'utilisateur est déjà utilisé.");
      return;
    }

    const emailUsed = users.some(
      (item) =>
        item.id !== profile.id &&
        item.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (emailUsed) {
      alert("Cette adresse email est déjà utilisée.");
      return;
    }

    onSave({
      name: name.trim(),
      email: email.trim(),
      username: username.trim()
    });
  }

  return (
    <>
      <Navbar />

      <div className="content">
        <Sidebar selected="Profile" setSelected={setSelected} />

        <main className="edit-profile">
          <h1>Modifier le profil</h1>
          <p>Modifiez les informations de votre compte</p>

          <form onSubmit={handleSubmit}>
            <label>Nom</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nom"
            />

            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />

            <label>Nom d'utilisateur</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nom d'utilisateur"
            />

            <label>Rôle</label>
            <input type="text" value={profile.role} disabled />

            <div className="edit-profile-buttons">
              <button type="submit">Enregistrer</button>
              <button type="button" onClick={() => setSelected("Profile")}>
                Annuler
              </button>
            </div>
          </form>
        </main>
      </div>
    </>
  );
}

export default EditProfile;