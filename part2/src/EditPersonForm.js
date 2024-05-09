import React, { useState } from 'react';

const EditPersonForm = ({ person, updatePerson }) => {
  const [newNumber, setNewNumber] = useState(person.number);

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleUpdatePerson = () => {
    const updatedPerson = { ...person, number: newNumber };
    updatePerson(updatedPerson);
    setNewNumber('');
  }

  return (
    <div>
      <h3>Edit {person.name}'s Number</h3>
      <div>
        Number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <button onClick={handleUpdatePerson}>Update Number</button>
    </div>
  );
};

export default EditPersonForm;
