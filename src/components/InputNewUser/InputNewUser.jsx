"use client"
import React, { useEffect, useState } from 'react';
import { addUser } from '../../../api/user'
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import Calendar from '../Calender/Calender';
import { convertToSqlDate } from '@/util/date';
import axios from '@/util/axios';
// import { addUser } from '../../../util/user'
const InputNewUser = ({ userInfo, selectedDoctor, selectedAssistant, selectedDate, selectedTime, selectedRoom, setStep }) => {
    const [name, setName] = useState("")
    const [dob, setDob] = useState("")
    const [email, setEmail] = useState("")
    const [gioiTinh, setGioiTinh] = useState("Other")
    const handleDateSelect = (date) => {
        setDob(date);
        console.log(date)
    };
    const handleBackStep = () => {
        setStep(1)
    }
    const handleSubmit = async () => {
        // try {

        // } catch (error) {
        //     toast.error("Lỗi thêm cuộc hẹn")
        // }
        const userData = {
            ten: name,
            soDienThoai: userInfo.soDienThoai,
            ngaySinh: convertToSqlDate(dob),
            gioiTinh: gioiTinh
        }
        const { data } = await axios.post(`/api/user`, userData)
        console.log(data)
        const userId = data.IDUser
        console.log("hú user mới", userId.IDUser)
        const submitData = {
            IDBenhNhan: userId.IDUser,
            IDNhaSi: selectedDoctor,
            IDTroKham: selectedAssistant,
            ngayHen: selectedDate,
            thoiGian: selectedTime
        }
        console.log("hú data", submitData)
        const result = await axios.post(`/api/Cuochen`, submitData)
        console.log(result)
        toast.info("ok em yêu")
        setStep(1)
    }
    return (
        <div className="booking-page">
            <h2>Nhập thông tin cá nhân </h2>
            <div className="form-container">
                <div className="form-section">
                    <label>Chọn ngày tháng năm sinh:</label>
                    <Calendar selectedDate={dob} handleDateClick={handleDateSelect} />
                </div>

                <div className="form-section">
                    <label>Nhập họ tên:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className='input-phone' />
                </div>
                <div className="form-section">
                    <label>Nhập email:</label>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className='input-phone' />
                </div>
                <div className="form-section">
                    <label>Chọn giới tính</label>
                    <select value={gioiTinh} name="gioi-tnih" onChange={(e) => setGioiTinh(e.target.value)}>
                        <option value="Male">Nam</option>
                        <option value="Female">Nữ</option>
                        <option value="Other">Khác</option>
                    </select>
                </div>

                <div className='form-section'>
                    <button onClick={handleSubmit}>Tiếp tục</button>
                    <button onClick={handleBackStep}>Lùi về</button>
                </div>
            </div>
        </div>
    );
};

export default InputNewUser;
