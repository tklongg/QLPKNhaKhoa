"use client"
import React, { useEffect, useState, useContext, useRef } from 'react'
import Calendar from '@/src/components/Calender/Calender';
import { useSearchParams } from 'next/navigation'
import CustomDropdown from '@/src/components/ChooseDoctorDropdown/ChooseDoctorDropdown';
import '../dathennhanvien.css'
import axios from '@/util/axios';
import { toast } from 'react-toastify';

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
const cache = {}
function AdjustAppointment() {
    //IDCuocHen, IDUser
    const searchParams = useSearchParams()
    const params = searchParams.get('appointment')
    const appointmentData = JSON.parse(params);
    console.log(appointmentData)
    const IDUser = appointmentData["IDUser"]
    const IDNhaSi = appointmentData["IDNhaSi"]
    const IDCuocHen = appointmentData.IDCuocHen
    const IDTroKham = appointmentData.IDTroKham
    const date = appointmentData.ngayHen
    const room = appointmentData.IDPhong
    const tg = appointmentData.thoiGian
    const stat = appointmentData.tinhTrang

    // const time = searchParams.get('time')
    // console.log(searchParams)
    //URLSearchParams { 'IDUser' => '1', 'IDCuocHen' => '1' }
    const [selectedAppointment, setSelectedAppointment] = useState("")
    const [doctors, setDoctors] = useState([])
    const [selectedDate, setSelectedDate] = useState(date);
    const [selectedTime, setSelectedTime] = useState("8:00");
    const [selectedDoctor, setSelectedDoctor] = useState(IDNhaSi);
    const [selectedRoom, setSelectedRoom] = useState(room);
    const [selectedAssistant, setSelectedAssistant] = useState(IDTroKham);
    const [selectedStatus, setSelectedStatus] = useState(stat)
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
        setSelectedAppointment(appointmentData.IDCuocHen)
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
    const handleStatusSelect = (e) => {
        setSelectedStatus(e.target.value)
    }
    const handleRoomSelect = (room) => {
        setSelectedRoom(room);
    };

    const handlePhoneInput = (e) => {
        setPhone(e.target.value)
    }
    const handleSubmit = async () => {
        const data = {
            IDCuocHen: selectedAppointment,
            IDUser: IDUser,
            IDNhaSi: selectedDoctor,
            IDTroKham: selectedAssistant,
            IDPhong: selectedRoom,
            ngayHen: selectedDate,
            thoiGian: selectedTime,
            tinhTrang: selectedStatus
        }
        console.log(data)
        try {
            const res = await axios.patch(`/api/Cuochen/${selectedAppointment}`, data)
            alert("Cập nhật thành công")
        } catch (error) {
            alert("Cập nhật không thành công")
            console.log(error)
        }

    };

    return (
        <div className="booking-page">
            <h2>Sửa cuộc hẹn </h2>
            <div className="form-container">
                <div className="form-section">
                    <label>Chọn ngày:</label>
                    <Calendar selectedDate={selectedDate} handleDateClick={handleDateSelect} />
                </div>

                <div className="form-section">
                    <label>Chọn phòng:</label>

                    <select
                        className='select-surfaces'
                        value={selectedRoom}
                        onChange={(e) => setSelectedRoom(e.target.value)}
                    >
                        {[...Array(300)].map((_, index) => (
                            <option key={index + 1} value={index + 1}>{`Room ${index + 1}`}</option>
                        ))}
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
                <div className="form-section">
                    <label>Chọn tình trạng:</label>
                    <select value={selectedStatus} onChange={handleStatusSelect}>
                        <option value="Cuộc hẹn mới">Cuộc hẹn mới</option>
                        <option value="Tái khám">Tái khám</option>

                    </select>
                </div>
                <div className='form-section'>
                    <button onClick={handleSubmit}>Sửa</button>
                    <button onClick={() => { }}>Hủy</button>
                </div>
            </div>
        </div>
    );
}

export default AdjustAppointment