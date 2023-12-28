import React, { useState } from 'react'
import './searchbar.css'
const SearchBar = () => {
    const [name, setName] = useState("")
    const handleChange = (e) => {
        setName(e.target.value);
    };
    const handleSubmit = () => {
        console.log('Đã gửi: ', name);
        setName('');
    };
    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Nhập tên bệnh nhân..."
                value={name}
                onChange={handleChange}
                className='input-name'
            />
            <button className="send-button" onClick={handleSubmit}>
                Tìm
            </button>
        </div>
    );
}

export default SearchBar