import React, { useState, useEffect } from 'react';
import personsService from './services/persons';
import Filter from './components/Filter';
import Persons from './components/Persons';
import Notification from './components/Notification';
import PersonsForm from './components/PersonsForm';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [notification, setNotification] = useState({ message: 'all updates logged here...', type: 'info' })

  useEffect(() => {
    personsService.getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      })
      .catch(error => {
        console.error('Error fetching data:', error);

      });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const existingPerson = persons.find(person => person.name === newName);

    if (existingPerson) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        const updatedPerson = { ...existingPerson, number: newNumber };
        personsService.update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson));
            setNewName(''); // Clear the input field after updating the person
            setNewNumber(''); // Clear the number after updating
            setNotification({ message: `${existingPerson.name} successfully updated`, type: 'success' });
            setTimeout(() => {
              setNotification({ message: null, type: null });
            }, 5000);
          })
          .catch(error => {
            console.error('Error updating person:', error);
            setNotification({ message: `Error updating ${existingPerson.name}`, type: 'error' });
          });
      }
    } else {
      const newPerson = { name: newName, number: newNumber };
      personsService.create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setNewName(''); // Clear the input field after adding the person
          setNewNumber(''); // Clear the number after adding
          setNotification({ message: `${newPerson.name} successfully added`, type: 'success' });
          setTimeout(() => {
            setNotification({ message: null, type: null });
          }, 5000);
        })
        .catch(error => {
          console.error('Error adding new person:', error);
          setNotification({ message: `Error adding ${newPerson.name}`, type: 'error' });
        });
    }
  };


  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id);
    if (person && window.confirm(`Delete ${person.name}?`)) {
      personsService.remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id));
          setNotification({ message: `${person.name} successfully deleted`, type: 'success' });
          setTimeout(() => {
            setNotification({ message: null, type: null });
          }, 5000);
        })
        .catch(error => {
          console.error('Error deleting person:', error);
          setNotification({ message: `Information of ${person.name} has already been removed from server`, type: 'error' });
          setTimeout(() => {
            setNotification({ message: null, type: null });
          }, 5000);
        });
    }
  };

  const filteredPersons = persons && persons.filter(person => 
    person.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.message} type={notification.type} />
      <Filter searchQuery={searchQuery} handleSearchChange={handleSearchChange} />
      <h2>Add a new</h2>
      <PersonsForm 
        newName={newName} 
        newNumber={newNumber} 
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange} 
        addPerson={addPerson} 
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} handleDelete={deletePerson} />
    </div>
  );
};

export default App;
