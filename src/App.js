import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InventoryList from './components/InventoryList';
import AddItem from './components/AddItem';
import EditItem from './components/EditItem';
import Reports from './components/Reports';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<InventoryList />} />
          <Route path="/add" element={<AddItem />} />
          <Route path="/edit/:id" element={<EditItem />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
