"use client"
import React, { useEffect, useState, useContext, useRef } from 'react'
import Calendar from '@/src/components/Calender/Calender';
import CustomDropdown from '@/src/components/ChooseDoctorDropdown/ChooseDoctorDropdown';
import './dathennhanvien.css'

const doctors = [
    { id: 1, name: 'Sam Smith' },
    { id: 2, name: 'Jill Johnson' },
    { id: 3, name: 'Jill Johnson 2' },
    // Add more doctors as needed
];
const assistants = [
    { id: 1, name: 'Sam Smith' },
    { id: 2, name: 'Jill Johnson' },
    { id: 3, name: 'Jill Johnson 2' },
    // Add more doctors as needed
];

function DatHenNhanVien() {
    const [phone, setPhone] = useState("")
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [selectedRoom, setSelectedRoom] = useState('');
    const [selectedAssistant, setSelectedAssistant] = useState('');



    const handleDateSelect = (date) => {
        setSelectedDate(date);
        console.log(date)
    };

    const handleTimeSelect = (time) => {
        setSelectedTime(time);
    };

    const handleDoctorSelect = (doctor) => {
        // const doctorJSON = JSON.parse(doctor)
        setSelectedDoctor(doctor.id);
        setExcluded(doctor.id)
        console.log(doctor)
        // setIsDoctorDropdownOpen(false);
    };
    const handleAssistantSelect = (assistant) => {
        // const doctorJSON = JSON.parse(doctor)
        setSelectedAssistant(assistant.id)
        console.log(assistant)
        // setIsDoctorDropdownOpen(false);
    };

    const handleRoomSelect = (room) => {
        setSelectedRoom(room);
    };

    const handlePhoneInput = (e) => {
        setPhone(e.target.value)
    }
    const handleSubmit = () => {
        // Placeholder logic, replace with actual logic to save appointment
        console.log('Booking appointment:', phone, selectedDate, selectedRoom, selectedDoctor, selectedAssistant, selectedTime,);
    };

    return (
        <div className="booking-page">
            <h2>Đặt hẹn </h2>
            <div className="form-container">
                <div className="form-section">
                    <label>Chọn ngày:</label>
                    <Calendar selectedDate={selectedDate} handleDateClick={handleDateSelect} />
                </div>

                <div className="form-section">
                    <label>Nhập số điện thoại:</label>
                    <input type="text" value={phone} onChange={handlePhoneInput} className='input-phone' />
                </div>

                <div className="form-section">
                    <label>Chọn phòng:</label>
                    <select onChange={(e) => handleRoomSelect(e.target.value)}>
                        <option selected value="Phòng 1">Phòng 1</option>
                        <option value="Phòng 2">Phòng 2</option>
                    </select>
                </div>



                <div className="form-section">
                    <label>Chọn bác sĩ:</label>
                    <CustomDropdown
                        options={doctors}
                        onSelect={(selectedOption) => handleDoctorSelect(selectedOption)}
                        type="bác sĩ"
                        excluded={selectedAssistant}
                    />
                </div>

                <div className="form-section">
                    <label>Chọn trợ khám:</label>
                    <CustomDropdown
                        options={assistants}
                        onSelect={(selectedOption) => handleAssistantSelect(selectedOption)}
                        type="trợ khám"
                        excluded={selectedDoctor}
                    />
                </div>

                <div className="form-section">
                    <label>Chọn thời gian:</label>
                    <select onChange={(e) => handleTimeSelect(e.target.value)}>
                        <option value="8:00 AM">8:00 AM</option>
                        <option value="9:00 AM">9:00 AM</option>
                        <option value="10:00 AM">10:00 AM</option>
                        {/* Add more options as needed */}
                    </select>
                </div>
                <div className='form-section'>
                    <button onClick={handleSubmit}>Đặt hẹn</button>
                </div>
            </div>
        </div>
    );
}

export default DatHenNhanVien