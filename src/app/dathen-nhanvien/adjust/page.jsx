"use client"
import React, { useEffect, useState, useContext, useRef } from 'react'
import Calendar from '@/src/components/Calender/Calender';
import { useSearchParams } from 'next/navigation'
import CustomDropdown from '@/src/components/ChooseDoctorDropdown/ChooseDoctorDropdown';
import '../dathennhanvien.css'

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

function AdjustAppointment() {
    //IDCuocHen, IDUser
    const searchParams = useSearchParams()
    const IDUser = searchParams.get('IDUser')
    const IDNhaSi = searchParams.get('IDNhaSi')
    const IDTroKham = searchParams.get('IDTroKham')
    const date = searchParams.get('date')
    const room = searchParams.get('room')
    // const time = searchParams.get('time')
    // console.log(searchParams)
    //URLSearchParams { 'IDUser' => '1', 'IDCuocHen' => '1' }
    const [selectedDate, setSelectedDate] = useState(room);
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [selectedRoom, setSelectedRoom] = useState('Phòng 1');
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
        // setExcluded(doctor.id)
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
                    <label>Chọn phòng:</label>
                    <select value={selectedRoom} onChange={(e) => handleRoomSelect(e.target.value)}>
                        <option value="Phòng 1">Phòng 1</option>
                        <option value="Phòng 2">Phòng 2</option>
                    </select>
                </div>



                <div className="form-section">
                    <label>Chọn bác sĩ:</label>
                    <CustomDropdown
                        // selected={doctors[0]}
                        options={doctors}
                        onSelect={(selectedOption) => handleDoctorSelect(selectedOption)}
                        type="bác sĩ"
                        excluded={selectedAssistant}
                    />
                </div>

                <div className="form-section">
                    <label>Chọn trợ khám:</label>
                    <CustomDropdown
                        // selected={assistants[1]}
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
                    <button onClick={handleSubmit}>Sửa</button>
                    <button onClick={handleSubmit}>Hủy</button>
                </div>
            </div>
        </div>
    );
}

export default AdjustAppointment