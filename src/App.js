import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts } from "./redux/operations";
import { selectContactsIsLoading, selectContactsError } from "./redux/selectors";
import ContactForm from "./components/ContactForm/ContactForm";
import ContactList from "./components/ContactList/ContactList";
import Filter from "./components/Filter/Filter";
import styled from "styled-components";

const Container = styled.div`
  width: 400px;
  margin: 40px auto;
  padding: 20px;
  background: #f3f3f3;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

export default function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectContactsIsLoading);
  const error = useSelector(selectContactsError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm />
      <h2>Contacts</h2>
      <Filter />
      
      {isLoading && <p style={{ textAlign: "center" }}>Loading contacts...</p>}
      {error && <p style={{ color: "red", textAlign: "center" }}>Error: {error}</p>}
      
      <ContactList />
    </Container>
  );
}