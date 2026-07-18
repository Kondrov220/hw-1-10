import { NavLink } from "react-redux"; 
import { NavLink as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import styles from "./Navigation.module.css";

export default function Navigation() {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <nav className={styles.nav}>
      {isLoggedIn && <RouterLink className={styles.link} to="/contacts">Contacts</RouterLink>}
      {!isLoggedIn && (
        <>
          <RouterLink className={styles.link} to="/register">Register</RouterLink>
          <RouterLink className={styles.link} to="/login">Login</RouterLink>
        </>
      )}
    </nav>
  );
}