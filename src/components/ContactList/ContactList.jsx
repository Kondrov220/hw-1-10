import { useSelector, useDispatch } from "react-redux";
import { deleteContact } from "../../redux/operations";
import { selectFilteredContacts } from "../../redux/selectors";
import PropTypes from "prop-types";
import styles from "./ContactList.module.css";

export default function ContactList() {
  const dispatch = useDispatch();
  const filteredContacts = useSelector(selectFilteredContacts);

  return (
    <ul className={styles.list}>
      {filteredContacts.map(({ id, name, phone }) => (
        <li key={id} className={styles.item}>
          <span>{name}: {phone}</span>
          <button 
            className={styles.deleteBtn}
            onClick={() => dispatch(deleteContact(id))}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

ContactList.propTypes = {
  filteredContacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
    })
  ),
};