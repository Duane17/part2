import React from 'react';

const PersonsForm = ({ newName, newNumber, handleNameChange, handleNumberChange, addPerson }) => (
  <form onSubmit={addPerson}>
    <div>
      name: <input value={newName} onChange={handleNameChange} placeholder="Enter name" />
    </div>
    <div>
      number: <input value={newNumber} onChange={handleNumberChange} placeholder='Enter new number'/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

export default PersonsForm;
