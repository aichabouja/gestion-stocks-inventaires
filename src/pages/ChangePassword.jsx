import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { api } from "../api";
import "./EditProfile.css";

function ChangePassword({ setSelected }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (currentPassword === "" || password === "" || confirmPassword === "") {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    if (password.length < 6) {
      alert("Le nouveau mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      await api("PUT", "/profile/password", { currentPassword, password });
      alert("Mot de passe modifié.");
      setSelected("Profile");
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <>
      <Navbar />

      <div className="content">
        <Sidebar selected="Profile" setSelected={setSelected} />

        <main className="edit-profile">
          <h1>Changer le mot de passe</h1>
          <p>Saisissez votre mot de passe actuel puis le nouveau.</p>

          <form onSubmit={handleSubmit}>
            <label>Mot de passe actuel</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Mot de passe actuel"
            />

            <label>Nouveau mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Au moins 6 caractères"
            />

            <label>Confirmer le nouveau mot de passe</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirmer le mot de passe"
            />

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

export default ChangePassword;
