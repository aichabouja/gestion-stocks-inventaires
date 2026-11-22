
import { useState } from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/useAuth";
import "./Login.css";

function Login() {
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const success = login(username, password);

    if (!success) {
      setError("Username or password is incorrect.");
    }
  }

  return (
    <div className="loginPage">
      <Navbar />

      <div className="login">
        <form onSubmit={handleSubmit}>
          <h2>Login to your account</h2>

          <label>Username or Email</label>
          <input
            type="text"
            placeholder="Enter your username or email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="loginerror">{error}</p>}

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
