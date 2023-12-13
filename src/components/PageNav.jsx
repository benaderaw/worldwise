import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";

export default function PageNav() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink to={"/"}>Hone</NavLink>
        </li>
        <li>
          <NavLink to={"/app"}>App</NavLink>
        </li>
        <li>
          <NavLink to={"/product"}>Product</NavLink>
        </li>
        <li>
          <NavLink to={"/pricing"}>pricing</NavLink>
        </li>
      </ul>
    </nav>
  );
}
