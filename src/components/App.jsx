import { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { nanoid } from 'nanoid';
import { Filter } from './Filter/Filter';
import { PhonebookStyled } from './App.styled';
//import { FilterStyled } from './Filter/Filter.styled';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };
  componentDidMount() {
    const localState = localStorage.getItem('local-contacts');
    const localStateParsed = JSON.parse(localState);
    if (localStateParsed !== null) {
      this.setState({ contacts: localStateParsed });
    }
  }
  componentDidUpdate(_, prevState) {
  
    if (prevState.contacts.length !== this.state.contacts.length) {
      localStorage.setItem(
        'local-contacts',
        JSON.stringify(this.state.contacts)
      );
    }
  }

  checkEqualContact = contact => {
    return this.state.contacts.some(
      el => el.name.toLowerCase() === contact.name.toLowerCase()
    );
  };

  addContact = contact => {
    if (!this.checkEqualContact(contact)) {
      this.setState(prevState => {
        return {
          contacts: [
            ...prevState.contacts,
            {
              id: nanoid(),
              ...contact,
            },
          ],
        };
      });
    } else alert('Such contact already exists');
  };

  filterContacts = filter => {
    this.setState({
      ...this.state,
      filter: filter,
    });
  };
  onDeleteContact = id => {
    return this.setState(state => {
      return { contacts: state.contacts.filter(el => el.id !== id) };
    });
  };
  render() {
    return (
      <PhonebookStyled>
        <h1>Phonebook</h1>
        <ContactForm addContact={this.addContact} />

        <h2>Total contacts: { this.state.contacts.length}</h2>
        {this.state.contacts.length !== 0&&<Filter filterContacts={this.filterContacts} />}
        <ContactList
          contactList={this.state}
          onDeleteContact={this.onDeleteContact}
        ></ContactList>
      </PhonebookStyled>
    );
  }
}
