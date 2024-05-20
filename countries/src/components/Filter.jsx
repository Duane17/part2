import React from 'react';

const Filter = ({ searchQuery, handleSearchChange }) => (
  <div>
    find countries <input value={searchQuery} onChange={handleSearchChange} />
  </div>
);

export default Filter;
