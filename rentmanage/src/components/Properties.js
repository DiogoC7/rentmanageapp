import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Properties() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/properties')
      .then(response => setProperties(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h2>Properties Management</h2>
      <ul>
        {properties.map(property => (
          <li key={property.id}>
            {property.name} - {property.street}, {property.city} {property.postalCode} (Year: {property.year})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Properties;
