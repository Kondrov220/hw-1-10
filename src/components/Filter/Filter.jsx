import { useSelector, useDispatch } from "react-redux";
import { setFilter } from "../../redux/reducer";
import { selectFilter } from "../../redux/selectors";
import styles from "./Filter.module.css";

export default function Filter() {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  return (
    <input
      className={styles.input}
      type="text"
      placeholder="Find contact by name"
      value={filter}
      onChange={(e) => dispatch(setFilter(e.target.value))}
    />
  );
}