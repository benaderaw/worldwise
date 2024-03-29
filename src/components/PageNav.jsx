import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "../components/Logo";
import { useAuth } from "../context/FakeAuthContext";

export default function PageNav() {
  const { isAuthenticated } = useAuth();

  return (
    <nav className={styles.nav}>
      <Logo />

      <ul>
        <li>
          <NavLink to={"/product"}>Product</NavLink>
        </li>
        <li>
          <NavLink to={"/pricing"}>pricing</NavLink>
        </li>
        {isAuthenticated ? (
          <li>
            <NavLink to={"/app"} className={styles.ctaLink}>
              APP
            </NavLink>
          </li>
        ) : (
          <li>
            <NavLink to={"/login"} className={styles.ctaLink}>
              Login
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}
