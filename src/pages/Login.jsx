import styles from "./Login.module.css";
import { useEffect, useState } from "react";
import PageNav from "../components/PageNav";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/FakeAuthContext";
import Button from "../components/Button";

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("ben@example.com");
  const [password, setPassword] = useState("qwerty");
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    login(email, password);
  }

  useEffect(() => {
    if (isAuthenticated) return navigate("/app", { replace: true });
  }, [isAuthenticated, navigate]);

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handleLogin}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary">Login</Button>
        </div>
      </form>
    </main>
  );
}
