import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Reports() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/items')
      .then(response => setItems(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1>Inventory Reports</h1>
      <h2>Items Needing Reorder</h2>
      <ul>
        {items.filter(item => item.quantity < item.reorderPoint).map(item => (
          <li key={item._id}>
            {item.name} - {item.quantity} (Reorder Point: {item.reorderPoint})
          </li>
        ))}
      </ul>
      <h2>All Items</h2>
      <ul>
        {items.map(item => (
          <li key={item._id}>
            {item.name} - {item.quantity} (Reorder Point: {item.reorderPoint})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Reports;
