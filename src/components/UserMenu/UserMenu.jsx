import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/auth/operations";
import { selectUser } from "../../redux/auth/selectors";
import styles from "./UserMenu.module.css";

export default function UserMenu() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  return (
    <div className={styles.wrapper}>
      <p className={styles.username}>Welcome, {user.email}</p>
      <button type="button" onClick={() => dispatch(logOut())} className={styles.btn}>
        Logout
      </button>
    </div>
  );
}