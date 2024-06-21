import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function InventoryList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/items')
      .then(response => setItems(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1>Inventory List</h1>
      <Link to="/add">Add New Item</Link>
      <Link to="/reports">View Reports</Link>
      <ul>
        {items.map(item => (
          <li key={item._id} style={{ color: item.quantity < item.reorderPoint ? 'red' : 'black' }}>
            {item.name} - {item.quantity} (Reorder Point: {item.reorderPoint})
            {item.quantity < item.reorderPoint && <span> - Needs Reordering</span>}
            <Link to={`/edit/${item._id}`}> Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InventoryList;
