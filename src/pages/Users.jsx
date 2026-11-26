
import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { api } from "../api";
import "./Users.css";

function Users({ selected, setSelected, users = [], refresh }) {
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("Tous");

  const emptyForm = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Gestionnaire"
  };

  const [form, setForm] = useState(emptyForm);

  function openAddForm() {
    setEditingUser(null);
    setForm(emptyForm);
    setShowForm(true);
  }

  function openEditForm(user) {
    setEditingUser(user);
    setForm({
      username: user.username,
      email: user.email,
      password: "",
      confirmPassword: "",
      role: user.role
    });
    setShowForm(true);
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      !form.username.trim() ||
      !form.email.trim()
    ) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    if (!editingUser && !form.password) {
      alert("Veuillez saisir un mot de passe.");
      return;
    }

    if (form.password && form.password.length < 7) {
      alert("Le mot de passe doit contenir au moins 7 caractères.");
      return;
    }

    if (form.password && form.password !== form.confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }

    const body = {
      username: form.username.trim(),
      email: form.email.trim(),
      role: form.role,
      status: editingUser ? editingUser.status : "Actif"
    };

    if (form.password) {
      body.password = form.password;
    }

    try {
      if (editingUser) {
        await api("PUT", `/users/${editingUser.id}`, body);
      } else {
        await api("POST", "/users", body);
      }

      await refresh();
      setShowForm(false);
      setForm(emptyForm);
      setEditingUser(null);
    } catch (error) {
      alert(error.message);
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Voulez-vous vraiment supprimer cet utilisateur ?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await api("DELETE", `/users/${id}`);
      await refresh();
    } catch (error) {
      alert(error.message);
    }
  }

  async function toggleStatus(id) {
    const user = users.find((item) => item.id === id);

    try {
      await api("PUT", `/users/${id}`, {
        username: user.username,
        email: user.email,
        role: user.role,
        status: user.status === "Actif" ? "Inactif" : "Actif"
      });
      await refresh();
    } catch (error) {
      alert(error.message);
    }
  }

  const filteredUsers = users.filter((user) => {
    const searchValue = search.toLowerCase();

    const matchesSearch =
      user.username.toLowerCase().includes(searchValue) ||
      user.email.toLowerCase().includes(searchValue);

    const matchesRole =
      roleFilter === "Tous" || user.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  return (
    <>
      <Navbar />

      <div className="content">
        <Sidebar selected={selected} setSelected={setSelected} />

        <main className="users-page">
          <div className="users-header">
            <div>
              <h1>Utilisateurs</h1>
              <p>Gérez les comptes et les rôles des utilisateurs.</p>
            </div>

            <button className="add-user-btn" onClick={openAddForm}>
              + Ajouter un utilisateur
            </button>
          </div>

          <div className="users-stats">
            <div className="user-stat-card">
              <span>Total utilisateurs</span>
              <strong>{users.length}</strong>
            </div>

            <div className="user-stat-card">
              <span>Administrateurs</span>
              <strong>
                {users.filter((user) => user.role === "Administrateur").length}
              </strong>
            </div>

            <div className="user-stat-card">
              <span>Gestionnaires</span>
              <strong>
                {users.filter((user) => user.role === "Gestionnaire").length}
              </strong>
            </div>
          </div>

          <div className="users-table-card">
            <div className="users-filters">
              <input
                type="text"
                placeholder="Rechercher un utilisateur..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <option value="Tous">Tous les rôles</option>
                <option value="Administrateur">Administrateur</option>
                <option value="Gestionnaire">Gestionnaire</option>
              </select>
            </div>

            <div className="users-table-container">
              <table className="users-table">
                <thead>
                  <tr>
                    <th>Nom d'utilisateur</th>
                    <th>Email</th>
                    <th>Rôle</th>
                    <th>Statut</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <tr key={user.id}>
                        <td>{user.username}</td>
                        <td>{user.email}</td>

                        <td>
                          <span
                            className={`role-badge ${
                              user.role === "Administrateur"
                                ? "admin-role"
                                : "manager-role"
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>

                        <td>
                          <span
                            className={`status-badge ${
                              user.status === "Actif"
                                ? "active-status"
                                : "inactive-status"
                            }`}
                          >
                            {user.status}
                          </span>
                        </td>

                        <td>
                          <div className="user-actions">
                            <button
                              className="edit-user-btn"
                              onClick={() => openEditForm(user)}
                            >
                              Modifier
                            </button>

                            <button
                              className="status-user-btn"
                              onClick={() => toggleStatus(user.id)}
                            >
                              {user.status === "Actif" ? "Désactiver" : "Activer"}
                            </button>

                            <button
                              className="delete-user-btn"
                              onClick={() => handleDelete(user.id)}
                            >
                              Supprimer
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="no-users">
                        Aucun utilisateur trouvé.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {showForm && (
            <div className="user-modal-overlay">
              <div className="user-modal">
                <div className="user-modal-header">
                  <h2>
                    {editingUser
                      ? "Modifier l'utilisateur"
                      : "Ajouter un utilisateur"}
                  </h2>

                  <button
                    className="close-modal-btn"
                    onClick={() => setShowForm(false)}
                  >
                    ×
                  </button>
                </div>

                <form onSubmit={handleSubmit}>
                  <label>Nom d'utilisateur</label>
                  <input
                    type="text"
                    name="username"
                    autoComplete="off"
                    value={form.username}
                    onChange={handleChange}
                    placeholder="Nom d'utilisateur"
                    required
                  />

                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="exemple@email.com"
                    required
                  />

                  <label>
                    {editingUser
                      ? "Nouveau mot de passe (facultatif)"
                      : "Mot de passe"}
                  </label>
                  <input
                    type="password"
                    name="password"
                    autoComplete="new-password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Mot de passe"
                    required={!editingUser}
                  />

                  <label>Confirmer le mot de passe</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    autoComplete="new-password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirmer le mot de passe"
                    required={!editingUser && !!form.password}
                  />

                  <label>Rôle</label>
                  <select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                  >
                    <option value="Administrateur">Administrateur</option>
                    <option value="Gestionnaire">Gestionnaire</option>
                  </select>

                  <div className="user-modal-actions">
                    <button
                      type="button"
                      className="cancel-user-btn"
                      onClick={() => setShowForm(false)}
                    >
                      Annuler
                    </button>

                    <button type="submit" className="save-user-btn">
                      {editingUser ? "Enregistrer" : "Créer l'utilisateur"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}

export default Users;
