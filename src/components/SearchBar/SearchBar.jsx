import React, { useState } from 'react'
import './searchbar.css'
const SearchBar = ({ searchTerm, setSearchTerm }) => {
    // const [searchTerm, setSearchTerm] = useState("")
    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Nhập tên bệnh nhân..."
                value={searchTerm}
                onChange={handleChange}
                className='input-name'
            />
            {/* <button className="send-button" onClick={handleSubmit}>
                Tìm
            </button> */}
        </div>
    );
}

export default SearchBar