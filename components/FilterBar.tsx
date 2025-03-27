import React from 'react';

const FilterBar = () => {
  return (
    <div className="filter-bar">
      <select className="filter-select">
        <option>All Local Authorities</option>
        <option>Leeds</option>
        <option>Sheffield</option>
        <option>Manchester</option>
      </select>

      <select className="filter-select">
        <option>All Phases</option>
        <option>Primary</option>
        <option>Secondary</option>
      </select>

      <select className="filter-select">
        <option>All Planning Groups</option>
        <option>Group A</option>
        <option>Group B</option>
      </select>

      <select className="filter-select">
        <option>All Planning Areas</option>
        <option>Area 1</option>
        <option>Area 2</option>
      </select>

      <select className="filter-select">
        <option>All School Types</option>
        <option>Academy</option>
        <option>Maintained</option>
      </select>
    </div>
  );
};

export default FilterBar;