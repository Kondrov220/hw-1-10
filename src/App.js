import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useUser } from "./context/context";
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

const InputBlock = styled.div`
  margin-bottom: 20px;

  p {
    margin: 0;
    font-weight: 600;
  }

  input {
    width: 100%;
    padding: 8px;
    margin-top: 4px;
    margin-bottom: 10px;
    border-radius: 6px;
    border: 1px solid #aaa;
  }
`;

const Btn = styled.button`
  padding: 10px 15px;
  border: none;
  background: #007aff;
  border-radius: 6px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 20px;

  &:hover {
    background: #005ad1;
  }
`;

const ContactList = styled.ul`
  list-style: none;
  padding: 0;
`;

const ContactItem = styled.li`
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    background: red;
    border: none;
    color: white;
    padding: 6px 10px;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background: darkred;
    }
  }
`;

function App() {
 const { contacts, setContacts } = useUser();

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [filter, setFilter] = useState("");

  const nameInputRef = useRef();


  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("contacts"));
    if (saved) setContacts(saved);
  }, []);


  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const addContact = () => {
    if (!name || !number) return;

    if (contacts.some(c => c.name.toLowerCase() === name.toLowerCase())) {
      alert(`${name} is already in contacts`);
      return;
    }

    setContacts([...contacts, { id: Date.now(), name, number }]);
    setName("");
    setNumber("");
    nameInputRef.current.focus(); 
  };

  const removeContact = (id) => {
    setContacts(contacts.filter(c => c.id !== id));
  };

  const filteredContacts = contacts.filter(c =>
    c.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Container>
      <Title>Phonebook</Title>

      <InputBlock>
        <p>Name</p>
        <input
          type="text"
          value={name}
          ref={nameInputRef} 
          onChange={e => setName(e.target.value)}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces."
          required
        />

        <p>Number</p>
        <input
          type="tel"
          value={number}
          onChange={e => setNumber(e.target.value)}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </InputBlock>

      <Btn onClick={addContact}>ADD</Btn>

      <Title>Contacts</Title>

      <input
        placeholder="Find contact"
        value={filter}
        onChange={e => setFilter(e.target.value)}
      />

      <ContactList>
        {filteredContacts.map(c => (
          <ContactItem key={c.id}>
            <div>
              <p>{c.name}</p>
              <p>{c.number}</p>
            </div>
            <button onClick={() => removeContact(c.id)}>Delete</button>
          </ContactItem>
        ))}
      </ContactList>
    </Container>
  );
}
export default App;
