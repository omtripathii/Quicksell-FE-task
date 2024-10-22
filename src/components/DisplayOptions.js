import React, { useState } from 'react';
import './DisplayOptions.css';
import { ReactComponent as TuneIcon } from '../icons_FEtask/Display.svg';
import { ReactComponent as ChevronIcon } from '../icons_FEtask/down.svg';

function DisplayOptions({ grouping, sorting, onGroupingChange, onSortingChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOptions = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="display-options">
      <button onClick={toggleOptions} className="display-button">
        <TuneIcon className="tune-icon" />
        Display
        <ChevronIcon className={`chevron-icon ${isOpen ? 'open' : ''}`} />
      </button>
      {isOpen && (
        <div className="options-dropdown">
          <div className="option">
            <span>Grouping</span>
            <select value={grouping} onChange={(e) => onGroupingChange(e.target.value)}>
              <option value="status">Status</option>
              <option value="user">User</option>
              <option value="priority">Priority</option>
            </select>
          </div>
          <div className="option">
            <span>Ordering</span>
            <select value={sorting} onChange={(e) => onSortingChange(e.target.value)}>
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}

export default DisplayOptions;
