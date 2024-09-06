import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Reports() {
  const [reports, setProperties] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/reports')
      .then(response => setProperties(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h2>Reports</h2>
    </div>
  );
}

export default Reports;
