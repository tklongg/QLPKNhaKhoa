"use client"
import React, { useEffect, useState, useContext, useRef } from 'react'
import Calendar from '@/src/components/Calender/Calender';
import CustomDropdown from '@/src/components/ChooseDoctorDropdown/ChooseDoctorDropdown';
import axios from '@/util/axios';
import './dathennhanvien.css'
import InputNewUser from '@/src/components/InputNewUser/InputNewUser';
import { convertToSqlDate } from '@/util/date';

// const doctors = [
//     { id: 1, name: 'Sam Smith' },
//     { id: 2, name: 'Jill Johnson' },
//     { id: 3, name: 'Jill Johnson 2' },
//     // Add more doctors as needed
// ];
// const assistants = [
//     { id: 1, name: 'Sam Smith' },
//     { id: 2, name: 'Jill Johnson' },
//     { id: 3, name: 'Jill Johnson 2' },
//     // Add more doctors as needed
// ];
const cache = {}
const step = ["Đặt hẹn", "Nhập thông tin cá nhân", "Hoàn thành"]
function DatHenNhanVien() {
    const [step, setStep] = useState(1)
    const [phone, setPhone] = useState("")
    const [userInfo, setUserInfo] = useState("")

    const [doctors, setDoctors] = useState([])
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [selectedRoom, setSelectedRoom] = useState('');
    const [selectedAssistant, setSelectedAssistant] = useState('');
    const [dataSubmit, setDataSubmit] = useState({})
    const checkPhone = async () => {
        const { data } = await axios.get(`/api/sodienthoai/${phone}`)
        if (data.IDUser != undefined) {
            setUserInfo(data)
        }
        else {
            const newUser = await axios.post(`/api/sodienthoai/${phone}`)
            setUserInfo(newUser)
        }
    }
    useEffect(() => {
        const fetchAllDentists = async () => {
            const { data } = await axios.get('/api/dentist/getalldentist')
            cache.dentists = data.slice(1, 1000)
            setDoctors(data.slice(1, 1000))
        }
        if (!cache.dentists) {
            fetchAllDentists()
        }
        else {
            setDoctors(cache.dentists)
        }
    }, [])

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
    const handleSubmit = async () => {
        // Placeholder logic, replace with actual logic to save appointment
        const { data } = await axios.get(`/api/sodienthoai/${phone}`)
        if (data.IDUser != undefined) {
            const submitData = {
                IDBenhNhan: data.IDUser,
                IDNhaSi: selectedDoctor,
                IDTroKham: selectedAssistant,
                ngayHen: selectedDate,
                thoiGian: selectedTime,
                IDPhong: selectedRoom
            }
            console.log(submitData)
            const result = await axios.post(`/api/Cuochen`, submitData)
            console.log(result)
        }
        else {
            setUserInfo({ soDienThoai: phone })
            setStep(2)
        }

    };

    return (
        <>
            {step == 1 ? <div className="booking-page">
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
                            {[...Array(300)].map((_, index) => (
                                <option key={index + 1} value={index + 1}>{`Room ${index + 1}`}</option>
                            ))}
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
                            options={doctors}
                            onSelect={(selectedOption) => handleAssistantSelect(selectedOption)}
                            type="trợ khám"
                            excluded={selectedDoctor}
                        />
                    </div>

                    <div className="form-section">
                        <label>Chọn thời gian:</label>
                        <select value={selectedTime} onChange={(e) => handleTimeSelect(e.target.value)}>
                            <option value="8:00">8:00</option>
                            <option value="9:00">9:00</option>
                            <option value="10:00">10:00</option>
                            <option value="11:00">11:00</option>
                            <option value="12:00">12:00</option>
                            <option value="13:00">13:00</option>
                            <option value="14:00">14:00</option>
                            <option value="15:00">15:00</option>
                            <option value="16:00">16:00</option>
                            <option value="17:00">17:00</option>
                            <option value="18:00">18:00</option>
                            {/* Add more options as needed */}
                        </select>
                    </div>
                    <div className='form-section'>
                        <button onClick={handleSubmit}>Đặt hẹn</button>
                    </div>
                </div>
            </div> : <InputNewUser
                userInfo={userInfo}
                selectedDoctor={selectedDoctor}
                selectedAssistant={selectedAssistant}
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                selectedRoom={selectedRoom}
                setStep={setStep}
            />
            }
        </>
    );
}

export default DatHenNhanVien