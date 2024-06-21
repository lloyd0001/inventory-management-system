const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Atlas connection
const dbURI = 'mongodb+srv://johnlloyd15:johnlloyd15@cluster0.0ycwtxv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Error connecting to MongoDB Atlas', err));

// Item schema and model
const itemSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  reorderPoint: Number,
});

const Item = mongoose.model('Item', itemSchema);

// Routes
app.get('/api/items', async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

app.post('/api/items', async (req, res) => {
  const { name, quantity, reorderPoint } = req.body;
  const newItem = new Item({ name, quantity, reorderPoint });
  await newItem.save();
  res.json(newItem);
});

app.get('/api/items/:id', async (req, res) => {
  const item = await Item.findById(req.params.id);
  res.json(item);
});

app.put('/api/items/:id', async (req, res) => {
  const { name, quantity, reorderPoint } = req.body;
  const updatedItem = await Item.findByIdAndUpdate(
    req.params.id,
    { name, quantity, reorderPoint },
    { new: true }
  );
  res.json(updatedItem);
});

app.delete('/api/items/:id', async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.json({ message: 'Item deleted' });
});

// Start server
const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
