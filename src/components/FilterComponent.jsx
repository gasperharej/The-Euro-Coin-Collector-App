// src/components/FilterComponent.jsx
import React, { useState } from 'react';

const FilterComponent = ({ onFilterChange }) => {
  const [filter, setFilter] = useState('');

  const handleChange = (e) => {
    setFilter(e.target.value);
    onFilterChange(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={filter}
        onChange={handleChange}
        placeholder="Išči kovanec..."
      />
    </div>
  );
};

export default FilterComponent;
