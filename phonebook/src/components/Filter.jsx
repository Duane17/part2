import React from 'react';

const Filter = ({ searchQuery, handleSearchChange }) => (
  <div>
    Search: <input value={searchQuery} onChange={handleSearchChange} placeholder='Search by name' />
  </div>
);

export default Filter;
