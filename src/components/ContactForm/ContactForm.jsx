import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addContact } from "../../redux/operations";
import { selectContacts as selectContactsItems } from '../../redux/selectors';
import styles from "./ContactForm.module.css";

export const ContactForm= () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContactsItems);

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !number) return;

    if (contacts.some((c) => c.name.toLowerCase() === name.toLowerCase())) {
      alert(`${name} is already in contacts.`);
      return;
    }

    dispatch(addContact({ name, number }));
    setName("");
    setNumber("");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="tel"
        placeholder="Number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        required
      />
      <button type="submit" className={styles.btn}>ADD</button>
    </form>
  );
}