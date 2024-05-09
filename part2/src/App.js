import React, { useState, useEffect } from 'react';
import axios from 'axios';  
import Course from './Course'; 
import EditPersonForm from './EditPersonForm';

const App = () => {
  const initialPersons = [
    { name: 'Arto Hellas', number: '123-456-7890' },
    { name: 'Ada Lovelace', number: '987-654-3210' },
    { name: 'Grace Hopper', number: '456-789-0123' }
  ];

  const [persons, setPersons] = useState(initialPersons);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('some error happened...');

  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        { name: 'Fundamentals of React', exercises: 10, id: 1 },
        { name: 'Using props to pass data', exercises: 7, id: 2 },
        { name: 'State of a component', exercises: 14, id: 3 },
        { name: 'Redux', exercises: 11, id: 4 },
      ],
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        { name: 'Routing', exercises: 3, id: 1 },
        { name: 'Middlewares', exercises: 7, id: 2 },
      ],
    },
  ];

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  }

  const addPerson = (event) => {
    event.preventDefault();
    const personExists = persons.some((person) => person.name === newName);
    if (personExists) {
      alert(`${newName} already exists in the phonebook!`);
    } else {
      const newPerson = { name: newName, number: newNumber };
      setPersons([...persons, newPerson]);
      setNewName('');
      setNewNumber('');
      setErrorMessage('Person added successfully!');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  }

  const removePerson = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this person?');
    if (confirmDelete) {
      axios.delete(`http://localhost:3001/persons/${id}`)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));
        })
        .catch(error => {
          console.log('Error deleting person:', error);
          setErrorMessage(`Error deleting person: ${error.message}`); 
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
    }
  };

  const handleUpdatePerson = (updatedPerson) => {
    const updatedPersons = persons.map(person =>
      person.id !== updatedPerson.id ? person : updatedPerson
    );
    setPersons(updatedPersons);
    axios.put(`http://localhost:3001/persons/${updatedPerson.id}`, updatedPerson)
      .then(() => {
        setErrorMessage('Number updated successfully!');
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      })
      .catch(error => {
        console.log('Error updating person:', error);
        setErrorMessage(`Error updating person: ${error.message}`); 
        setTimeout(() => {
          setErrorMessage(null); 
        }, 5000);
      });
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
      <h2>Add a new person</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      <PersonsList persons={filteredPersons} handleRemove={removePerson} />
      {filteredPersons.map((person) => (
        <li key={person.id}>
          {person.name} - {person.number}{' '}
          <button onClick={() => removePerson(person.id)}>Delete</button>
          <EditPersonForm person={person} updatePerson={handleUpdatePerson} />
        </li>
      ))}
      {courses.map((course) => (
        <div key={course.id}>
          <Course course={course} />
        </div>
      ))}
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
    </div>
  );
};

const Filter = ({ searchTerm, handleSearchChange }) => (
  <div>
    Filter by name: <input value={searchTerm} onChange={handleSearchChange} />
  </div>
);

const PersonForm = ({ newName, newNumber, handleNameChange, handleNumberChange, addPerson }) => (
  <form onSubmit={addPerson}>
    <div>
      Name: <input value={newName} onChange={handleNameChange} />
    </div>
    <div>
      Number: <input value={newNumber} onChange={handleNumberChange} />
    </div>
    <div>
      <button type="submit">Add</button>
    </div>
  </form>
);

const PersonsList = ({ persons, handleRemove }) => (
  <ul>
    {persons.map((person) => (
      <li key={person.id}>
        {person.name} - {person.number}{' '}
        <button onClick={() => handleRemove(person.id)}>Delete</button>
      </li>
    ))}
  </ul>
);

export default App;
