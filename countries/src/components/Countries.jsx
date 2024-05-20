import React, { useState } from "react";

const Countries = ({ countries }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleToggleDetails = (country) => {
    if (selectedCountry && selectedCountry.name.common === country.name.common) {
      setSelectedCountry(null); 
    } else {
      setSelectedCountry(country); 
    }
  };

  if (countries.length === 1) {
    const country = countries[0];
    const languages = Object.values(country.languages);

    return (
      <div>
        <h2>{country.name.common}</h2>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area}</p>
        <h3>Languages</h3>
        <ul>
          {languages.map((language, index) => (
            <li key={index}>{language}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="100" />
      </div>
    );
  } else if (countries.length <= 10) {
    return (
      <ul>
        {countries.map((country, index) => (
          <li key={index}>
            {country.name.common}
            <button onClick={() => handleToggleDetails(country)}>
              {selectedCountry && selectedCountry.name.common === country.name.common ? 'hide' : 'show'}
            </button>
            {selectedCountry && selectedCountry.name.common === country.name.common && (
              <div>
                <h2>{selectedCountry.name.common}</h2>
                <p>Capital: {selectedCountry.capital}</p>
                <p>Area: {selectedCountry.area}</p>
                <h3>Languages</h3>
                <ul>
                  {Object.values(selectedCountry.languages).map((language, index) => (
                    <li key={index}>{language}</li>
                  ))}
                </ul>
                <img src={selectedCountry.flags.png} alt={`Flag of ${selectedCountry.name.common}`} width="100" />
              </div>
            )}
          </li>
        ))}
      </ul>
    );
  } else {
    return <p>Too many matches, specify another filter.</p>;
  }
};

export default Countries;
