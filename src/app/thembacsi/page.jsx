"use client"
import React, { useEffect, useState, useContext, useRef } from 'react'
import Calendar from '@/src/components/Calender/Calender';
import CustomDropdown from '@/src/components/ChooseDoctorDropdown/ChooseDoctorDropdown';
import './dathen.css'
import axios from '@/util/axios';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
function DatHen() {
    const [phone, setPhone] = useState('')
    const [name, setName] = useState('')
    const [ngaySinh, setNgaySinh] = useState("")
    const [email, setEmail] = useState("")
    const [gioiTinh, setGioiTinh] = useState("Other")

    const handleSubmit = async () => {
        try {
            const result = await axios.post("/api/dentist", {
                ten: name,
                soDienThoai: phone,
                ngaySinh: ngaySinh,
                email,
                gioiTinh
            })
            console.log(result)
            toast.info("Thêm user thành công")
        } catch (error) {
            console.log(error)
            toast.error("không em")
        }
    };

    return (
        <div className="booking-page">
            <h2>Thêm bác sĩ mới </h2>
            <div className="form-container">

                <div className="form-section">
                    <label>Nhập số điện thoại :</label>
                    <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div className="form-section">
                    <label>Nhập tên :</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="form-section">
                    <label>Nhập email :</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-section">
                    <label>Nhập ngày tháng năm sinh :</label>
                    <input type="date" value={ngaySinh} onChange={(e) => setNgaySinh(e.target.value)} />
                </div>
                <div className="form-section">
                    <label>Chọn giới tính :</label>
                    <select name="" id="" onChange={(e) => setGioiTinh(e.target.value)} value={gioiTinh}>
                        <option value="Male">Nam</option>
                        <option value="Female">Nữ</option>
                        <option value="Other">Khác</option>
                    </select>
                </div>

                <div className='form-section'>
                    <button onClick={handleSubmit}>Thêm bác sĩ</button>
                </div>
            </div>
        </div>
    );
}

export default DatHen