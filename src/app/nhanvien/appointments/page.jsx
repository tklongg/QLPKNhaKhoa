// appointments.js
"use client"
import React, { useState, useEffect } from 'react';

import './appointment.css'
import useLocalStorage from '@/src/hooks/useLocalStorage';
import axios from '@/util/axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
// const appointments = [
//     {
//         "IDCuocHen": 1,
//         "IDBenhNhan": 123,
//         "IDNhaSi": 456,
//         "IDTroKham": 789,
//         "thoiGian": "08:30",
//         "ngayHen": "2023-12-01",
//         "soDienThoai": "01234567890",
//         "IDPhong": 1,
//         "tinhTrang": "Đã xác nhận",
//         "tenUser": "John Doe",
//         "tenBacSi": "Bác Sĩ A",
//         "tenTroKham": "Trợ Kham A",
//         "tenPhongKham": "Phòng Khám A"
//     },
//     {
//         "IDCuocHen": 2,
//         "IDBenhNhan": 234,
//         "IDNhaSi": 567,
//         "IDTroKham": 890,
//         "thoiGian": "10:00",
//         "ngayHen": "2023-01-02",
//         "soDienThoai": "09876543210",
//         "IDPhong": 2,
//         "tinhTrang": "Chưa xác nhận",
//         "tenUser": "Jane Doe",
//         "tenBacSi": "Bác Sĩ B",
//         "tenTroKham": "Trợ Kham B",
//         "tenPhongKham": "Phòng Khám B"
//     },
//     {
//         "IDCuocHen": 3,
//         "IDBenhNhan": 345,
//         "IDNhaSi": 678,
//         "IDTroKham": 901,
//         "thoiGian": "14:30",
//         "ngayHen": "2023-01-03",
//         "soDienThoai": "01234567891",
//         "IDPhong": 1,
//         "tinhTrang": "Đã hủy",
//         "tenUser": "Bob Smith",
//         "tenBacSi": "Bác Sĩ C",
//         "tenTroKham": null,
//         "tenPhongKham": "Phòng Khám C"
//     }
// ];

const Appointments = () => {
    const [appointments, setAppointments] = useState([])
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [userData, setUserData] = useLocalStorage("userData", "");
    const [filterPatientName, setFilterPatientName] = useState("");
    const [filterRoom, setFilterRoom] = useState("");
    const [filterByDoctor, setFilterByDoctor] = useState(false);
    const [filteredAppointments, setFilteredAppointments] = useState([]);
    const [filterByDate, setFilterByDate] = useState(null)
    const [allRoom, setAllRoom] = useState([])

    const handleToggleDetails = (appointment) => {
        if (selectedAppointment && selectedAppointment.IDCuocHen === appointment.IDCuocHen) {
            setSelectedAppointment(null);
        } else {

            setSelectedAppointment(appointment);
        }
    };
    const filterAppointments = (appointment) => {
        const patientNameMatch = appointment.tenUser.toLowerCase().includes(filterPatientName.toLowerCase());
        const roomMatch = filterRoom === "Tất cả" || appointment.tenPhongKham.toLowerCase().includes(filterRoom.toLowerCase());
        const doctorMatch = !filterByDoctor || (appointment.IDNhaSi === userData.id);
        const dateMatch = filterByDate && (appointment.ngayHen === filterByDate);

        return patientNameMatch && roomMatch && doctorMatch && dateMatch;
    };
    const handleFilter2 = () => {
        const filteredAppointments = appointments.filter(filterAppointments);
        setFilteredAppointments(filteredAppointments);
    };
    const handleFilter = () => {

        const filteredAppointments = appointments.filter((appointment) => {
            // Lọc theo tên bệnh nhân
            const patientNameMatch = appointment.tenUser.toLowerCase().includes(filterPatientName.toLowerCase());

            // Lọc theo phòng khám
            const roomMatch = filterRoom === "Tất cả" || appointment.tenPhongKham.toLowerCase().includes(filterRoom.toLowerCase());

            // Lọc theo nha sĩ
            const doctorMatch = !filterByDoctor || (appointment.IDNhaSi === userData.id);

            const dateMatch = !filterByDate || (appointment.ngayHen === filterByDate)
            return patientNameMatch && roomMatch && doctorMatch && dateMatch;
        });

        // Cập nhật state với dữ liệu đã lọc
        setFilteredAppointments(filteredAppointments);
    };

    useEffect(() => {
        handleFilter()
        // handleFilter();
        // console.log({ userData, filterPatientName, filterRoom, filterByDoctor, filterByDate })
    }, [userData, filterPatientName, filterRoom, filterByDoctor, filterByDate]);
    useEffect(() => {
        const fetchMeetingData = async () => {
            const { data } = await axios.get('/api/Cuochen')
            setAppointments(data)
            const uniqueRooms = [...new Set(data.map((a) => a["tenPhongKham"]))];
            setAllRoom(['Tất cả', ...uniqueRooms]);
            console.log(allRoom)
        }
        fetchMeetingData()
    }, [])
    const router = useRouter()
    const handleEdit = ({ IDCuocHen, IDUser, IDNhaSi, IDTroKham, thoiGian, ngayHen, IDPhong, tinhTrang }) => {
        router.push({
            pathname: '/dathen-nhanvien/adjust',
            query: { IDCuocHen, IDUser, IDNhaSi, IDTroKham, thoiGian, ngayHen, IDPhong, tinhTrang },
        });
    }
    const handleAddApm = () => {

    }
    return (

        <div>
            <div className='title-wrap'>
                <div className='page-title'>
                    <p>Cuộc hẹn</p>
                </div>
            </div>
            <div className='add-apm-btn'>
                <button onClick={handleAddApm}>
                    Thêm cuộc hẹn
                </button>
            </div>

            <div className="filter-section">
                <p>Chọn ngày</p>
                <input type="date" onChange={((e) => {
                    console.log(e.target.value)
                    setFilterByDate(e.target.value)
                })}></input>
                <p>Tên Bệnh Nhân:</p>
                <input
                    type="text"
                    value={filterPatientName}
                    onChange={(e) => setFilterPatientName(e.target.value)}
                />

                <p>Phòng Khám:</p>
                <select
                    value={filterRoom}
                    onChange={(e) => setFilterRoom(e.target.value)}
                >
                    {allRoom.map((room, index) => (
                        <option key={index} value={room}>
                            {room}
                        </option>
                    ))}
                </select>

                {userData.userType === "Dentist" && (
                    <div>
                        <input
                            type="checkbox"
                            checked={filterByDoctor}
                            onChange={() => setFilterByDoctor(!filterByDoctor)}
                        />
                        Của bạn
                    </div>
                )}

            </div>
            <div className='appointments-container'>

                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Ngày hẹn</th>
                            <th>Thời gian</th>
                            <th>Tên User</th>
                            <th>Số điện thoại</th>
                            <th>Tên Bác Sĩ</th>
                            <th>Tên Phòng Khám</th>
                            <th>Tình trạng</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAppointments.length > 0 ? (
                            filteredAppointments.map((appointment) =>

                            (
                                <React.Fragment key={appointment.IDCuocHen}>
                                    <tr >
                                        <td>{appointment.IDCuocHen}</td>
                                        <td>{appointment.ngayHen}</td>
                                        <td>{appointment.thoiGian}</td>
                                        <td>{appointment.tenUser}</td>
                                        <td>{appointment.soDienThoai}</td>
                                        <td>{appointment.tenBacSi}</td>
                                        <td>{appointment.tenPhongKham}</td>
                                        <td>{appointment.tinhTrang}</td>
                                        <td>
                                            {userData.userType != "Dentist" && <Link
                                                href={{
                                                    pathname: '/dathen-nhanvien/adjust',
                                                    query: {
                                                        appointment: JSON.stringify({
                                                            IDUser: appointment.IDBenhNhan,
                                                            IDNhaSi: appointment.IDNhaSi,
                                                            IDTroKham: appointment.IDTroKham,
                                                            IDPhong: appointment.IDPhong,
                                                            IDCuocHen: appointment.IDCuocHen,
                                                            thoiGian: appointment.thoiGian,
                                                            ngayHen: appointment.ngayHen,
                                                            tinhTrang: appointment.tinhTrang
                                                        })
                                                    }
                                                }}
                                                target='_blank'
                                            >
                                                <button >
                                                    Sửa
                                                </button>
                                            </Link>}
                                            {userData.userType != "Dentist" && <button onClick={() => handleDelete(appointment.IDCuocHen)}>
                                                Xóa
                                            </button>}
                                            <button onClick={() => handleToggleDetails(appointment)}>
                                                Xem chi tiết
                                            </button>
                                        </td>
                                    </tr>
                                    {selectedAppointment === appointment && (
                                        <tr className="detail-row">
                                            <td colSpan="9">
                                                <div className="detail-content">
                                                    <p><strong>Thông tin chi tiết:</strong></p>
                                                    <div className="detail-info">
                                                        <div>
                                                            <p><strong>ID Cuộc Hẹn:</strong> {appointment.IDCuocHen}</p>
                                                            <p><strong>ID User:</strong> {appointment.IDBenhNhan}</p>
                                                            <p><strong>ID Bác Sĩ:</strong> {appointment.IDNhaSi}</p>
                                                            <p><strong>ID Trợ Kham:</strong> {appointment.IDTroKham}</p>
                                                            <p><strong>Ngày Hẹn:</strong> {appointment.ngayHen}</p>
                                                            <p><strong>Thời Gian:</strong> {appointment.thoiGian}</p>


                                                        </div>
                                                        <div>
                                                            <p><strong>Tên User:</strong> {appointment.tenUser}</p>
                                                            <p><strong>Tên Bác Sĩ:</strong> {appointment.tenBacSi}</p>
                                                            <p><strong>Tên Trợ Khám:</strong> {appointment.tenTroKham || "Không có"}</p>
                                                            <p><strong>Tên Phòng Khám:</strong> {appointment.tenPhongKham}</p>
                                                            <p><strong>Tình Trạng:</strong> {appointment.tinhTrang}</p>
                                                            <p><strong>Số Điện Thoại:</strong> {appointment.soDienThoai}</p>
                                                        </div>
                                                    </div>
                                                    <button onClick={() => handleToggleDetails(appointment)}>
                                                        Đóng
                                                    </button>
                                                    {
                                                        userData.userType != "Patient" &&
                                                        <Link
                                                            href={{
                                                                pathname: '/dathen-nhanvien/adjust',
                                                                query: {
                                                                    appointment: JSON.stringify({
                                                                        IDUser: appointment.IDBenhNhan,
                                                                        IDNhaSi: appointment.IDNhaSi,
                                                                        IDTroKham: appointment.IDTroKham,
                                                                        IDPhong: appointment.IDPhong,
                                                                        IDCuocHen: appointment.IDCuocHen,
                                                                        thoiGian: appointment.thoiGian,
                                                                        ngayHen: appointment.ngayHen,
                                                                        tinhTrang: appointment.tinhTrang
                                                                    })
                                                                }
                                                            }}
                                                            target='_blank'
                                                        >
                                                            <button >
                                                                Sửa
                                                            </button>
                                                        </Link>

                                                    }
                                                </div>
                                            </td>
                                        </tr>
                                    )}


                                </React.Fragment>
                            )
                            )



                        ) : (
                            <tr>
                                <td colSpan="9">Không có cuộc hẹn phù hợp.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

        </div>

    );
};

export default Appointments;
