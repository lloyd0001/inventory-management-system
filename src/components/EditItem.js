import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditItem() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [reorderPoint, setReorderPoint] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/items/${id}`)
      .then(response => {
        setName(response.data.name);
        setQuantity(response.data.quantity);
        setReorderPoint(response.data.reorderPoint);
      })
      .catch(error => console.error('Error fetching item:', error));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/api/items/${id}`, { name, quantity, reorderPoint })
      .then(() => navigate('/'))
      .catch(error => console.error('Error updating item:', error));
  };

  return (
    <div>
      <h1>Edit Item</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Reorder Point"
          value={reorderPoint}
          onChange={(e) => setReorderPoint(e.target.value)}
          required
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditItem;
