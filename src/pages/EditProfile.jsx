import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./EditProfile.css";

function EditProfile({ profile, setSelected, onSave }) {
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