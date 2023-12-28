"use client"
import React, { useState, useRef, useEffect } from 'react';
import './CustomDropdown.css'; // Tên file CSS của custom dropdown

const CustomDropdown = ({ selected, options, onSelect, type, excluded }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedOption, setSelectedOption] = useState(selected || null);
    const dropdownRef = useRef(null);

    const handleToggleDropdown = () => {
        setIsOpen(!isOpen);

    };

    const handleSelectOption = (option) => {
        setSelectedOption(option);
        onSelect(option);
        setIsOpen(false);
        console.log(option)
    };

    const handleSearchTermChange = (e) => {
        setSearchTerm(e.target.value);
        console.log(e.target.value)
    };

    useEffect(() => {
        // Close the dropdown if the user clicks outside of it
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [dropdownRef]);

    const filteredOptions = options.filter((option) =>
        option.name.toLowerCase().includes(searchTerm.toLowerCase()) && (option.id != excluded)
    );

    return (
        <div className="custom-dropdown" ref={dropdownRef}>
            <div className="selected-option" onClick={handleToggleDropdown}>
                {selectedOption ? selectedOption.name : `Chọn ${type}...`}
            </div>
            {isOpen && (
                <div className="dropdown-options">
                    <input
                        type="text"
                        placeholder={`Tìm kiếm ${type}...`}
                        value={searchTerm}
                        onChange={handleSearchTermChange}
                    />
                    <ul>
                        {filteredOptions.map((option) => (
                            <li key={option.id} onClick={() => handleSelectOption(option)}>
                                {option.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default CustomDropdown;
