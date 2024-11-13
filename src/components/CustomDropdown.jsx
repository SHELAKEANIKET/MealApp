import React, { useEffect, useRef, useState } from "react";

const CustomDropdown = ({ options, onSelect, name }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(name);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option) => {
    setSelected(option);
    onSelect(option);
    setIsOpen(false);
  };

  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      !buttonRef.current.contains(event.target)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative inline-block md:w-64">
      <button
        ref={buttonRef}
        onClick={toggleDropdown}
        className="p-2 border border-borderColor w-40 sm:w-full rounded-md bg-white text-left shadow-sm focus:outline-none"
      >
        {selected}
      </button>
      {isOpen && (
        <ul
          className="absolute w-40 sm:w-full mt-1 border border-borderColor bg-white rounded-md shadow-lg z-10"
          ref={dropdownRef}
        >
          {options.map((option) => (
            <li
              key={option}
              onClick={() => handleSelect(option)}
              className="p-2 hover:bg-black hover:text-white cursor-pointer overflow-hidden"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
