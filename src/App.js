import './App.css';
import { Component } from 'react';
import styled from 'styled-components';
let one = 10;
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

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    name: '',
    number: ''
  };

  remov = (id) => {
    this.setState({
      contacts: this.state.contacts.filter(task => task.id !== id)
    });
  };

  add = () => {
    this.setState({
      contacts: [...this.state.contacts, { id: `id-${one + 1}`, name: `${document.querySelector("#name").value}`, number: `${document.querySelector("#number").value}` }]
    });
    one = +1
  }

  filter = (e) => {
    this.setState({ filter: e.target.value.toLowerCase() });
  };

  render() {

    const contacts = this.state.contacts.filter(contact =>
  contact.name.toLowerCase().includes(this.state.filter) ||
  contact.number.includes(this.state.filter)
);

    return (
      <Container>
        <Title>PhoneBook</Title>

        <InputBlock>
          <p>Name</p>
          <input
            id='name'
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />

          <p>Number</p>
          <input id='number' type="number" />
        </InputBlock>

        <Btn onClick={() => this.add()}>ADD</Btn>

        <Title>Contacts</Title>

        <p>Find Contacts by name or number</p>
        <input
          id='find'
          style={{ width: '100%', padding: '8px', marginBottom: '20px' }}
          onChange={this.filter}
        />

        <ContactList>

        </ContactList>
        {contacts.map(obj => (
  <ContactItem key={obj.id}>
    <div>
      <p>{obj.name}</p>
      <p>{obj.number}</p>
    </div>
    <button onClick={() => this.remov(obj.id)}>Видалити</button>
  </ContactItem>
))}
      </Container>
    );
  }
}

export default App;
