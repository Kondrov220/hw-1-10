import { useReducer, useEffect } from "react";
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
`;

const initialState = {
  contacts: [],
  name: "",
  number: "",
  filter: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_NAME":
      return { ...state, name: action.payload };

    case "SET_NUMBER":
      return { ...state, number: action.payload };

    case "ADD":
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
        name: "",
        number: "",
      };

    case "DELETE":
      return {
        ...state,
        contacts: state.contacts.filter(c => c.id !== action.payload),
      };

    case "SET_CONTACTS":
      return { ...state, contacts: action.payload };

    case "FILTER":
      return { ...state, filter: action.payload };

    default:
      return state;
  }
}

function useLocalStorage(contacts, dispatch) {
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("contacts"));
    if (saved) dispatch({ type: "SET_CONTACTS", payload: saved });
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { contacts, name, number, filter } = state;

  useLocalStorage(contacts, dispatch);

  const addContact = () => {
    if (!name || !number) return;

    if (contacts.some(c => c.name.toLowerCase() === name.toLowerCase())) {
      alert("Already exists");
      return;
    }

    dispatch({
      type: "ADD",
      payload: { id: Date.now(), name, number },
    });
  };

  const filtered = contacts.filter(c =>
    c.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Container>
      <Title>Phonebook</Title>

      <input
        placeholder="Name"
        value={name}
        onChange={e =>
          dispatch({ type: "SET_NAME", payload: e.target.value })
        }
      />

      <input
        placeholder="Number"
        value={number}
        onChange={e =>
          dispatch({ type: "SET_NUMBER", payload: e.target.value })
        }
      />

      <Btn onClick={addContact}>ADD</Btn>

      <Title>Contacts</Title>

      <input
        placeholder="Find contact"
        value={filter}
        onChange={e =>
          dispatch({ type: "FILTER", payload: e.target.value })
        }
      />

      <ul>
        {filtered.map(c => (
          <li key={c.id}>
            {c.name} — {c.number}
            <button
              onClick={() =>
                dispatch({ type: "DELETE", payload: c.id })
              }
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </Container>
  );
}
