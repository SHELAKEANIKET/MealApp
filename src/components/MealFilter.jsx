import React, { useState } from "react";

const MealFilter = ({ onFilterChange }) => {
  const [selectedArea, setSelectedArea] = useState("");

  const handleAreaChange = (e) => {
    const area = e.target.value;
    setSelectedArea(area);
    onFilterChange(area); // Pass selected area back to the parent component
  };

  return (
    <select
      value={selectedArea}
      onChange={handleAreaChange}
      className="p-2 border border-gray-300 rounded-md text-gray-700 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">Select Area</option>
      {areas.map((area) => (
        <option key={area} value={area}>
          {area}
        </option>
      ))}
    </select>
  );
};

export default MealFilter;
