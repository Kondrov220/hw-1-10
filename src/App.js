import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addContact, deleteContact, setFilter } from "./redux/reducer";
import styled from "styled-components";
import "./App.css";

const Container = styled.div`
  width: 400px;
  margin: 0 auto;
  padding: 20px;
  background: #f3f3f3;
  border-radius: 10px;
`;

const Title = styled.h2`
  text-align: center;
`;

const Btn = styled.button`
  padding: 10px;
  border: none;
  background: #007aff;
  color: white;
  border-radius: 6px;
  margin-bottom: 20px;
  cursor: pointer;
`;

export default function App() {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts);
  const filter = useSelector(state => state.filter);

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const add = () => {
    if (!name || !number) return;

    if (contacts.some(c => c.name.toLowerCase() === name.toLowerCase())) {
      alert(`${name} is already in contacts.`);
      return;
    }

    dispatch(
      addContact({
        id: `id-${Date.now()}`,
        name,
        number,
      })
    );

    setName("");
    setNumber("");
  };

  const filteredContacts = contacts.filter(c =>
    c.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Container>
      <Title>Phonebook</Title>

      <input
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <input
        placeholder="Number"
        value={number}
        onChange={e => setNumber(e.target.value)}
      />

      <Btn onClick={add}>ADD</Btn>

      <Title>Contacts</Title>

      <input
        placeholder="Find contact"
        value={filter}
        onChange={e => dispatch(setFilter(e.target.value))}
      />

      <ul>
        {filteredContacts.map(c => (
          <li key={c.id}>
            {c.name} — {c.number}
            <button onClick={() => dispatch(deleteContact(c.id))}>
              X
            </button>
          </li>
        ))}
      </ul>
    </Container>
  );
}