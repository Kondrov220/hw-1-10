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

const MainTitle = styled.h1`
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  margin-top: 20px;
  margin-bottom: 10px;
`;

export default function App() {
  return (
    <Container>
      <MainTitle>Phonebook</MainTitle>
      <ContactForm />

      <SectionTitle>Contacts</SectionTitle>
      <Filter />
      <ContactList />
    </Container>
  );
}