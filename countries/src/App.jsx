import React, { useState, useEffect } from "react";
import axios from 'axios';
import Filter from "./components/Filter";
import Countries from "./components/Countries";

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
        setCountries([]);
        setLoading(false);
        setError('Failed to fetch countries. Please try again.');
      });
  }, []);

  const handleSearchChange = (event) => {
    
    setSearchQuery(event.target.value);
  };

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Filter searchQuery={searchQuery} handleSearchChange={handleSearchChange} />
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {filteredCountries.length > 10 ? (
        <p>Too many matches, specify another filter.</p>
      ) : (
        <Countries countries={filteredCountries} />
      )}
    </div>
  );
};

export default App;
