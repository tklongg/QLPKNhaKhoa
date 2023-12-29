// patients.js
"use client"
import React, { useState, useEffect } from 'react';
import './patients.css'
import SearchBar from '@/src/components/SearchBar/SearchBar';
import Link from 'next/link';
import Pagination from '@/src/components/Pagination/Pagination';
import axios from '@/util/axios';
const areaDataCache = {};
// const patients = [
//     {
//         IDUser: 1,
//         soDienThoai: '0987654321',
//         ten: 'Nguyễn Văn A',
//         ngaySinh: '1990-01-01',
//         gioiTinh: 'Nam',
//         email: 'nguoibenh1@gmail.com',
//         userType: 'Patient',
//     },
//     {
//         IDUser: 2,
//         soDienThoai: '0123456789',
//         ten: 'Nguyễn Thị B',
//         ngaySinh: '1985-05-10',
//         gioiTinh: 'Nữ',
//         email: 'nguoibenh2@gmail.com',
//         userType: 'Patient',
//     },
//     {
//         IDUser: 3,
//         soDienThoai: '0123456789',
//         ten: 'Nguyễn Thị C',
//         ngaySinh: '1985-05-10',
//         gioiTinh: 'Nữ',
//         email: 'nguoibenh2@gmail.com',
//         userType: 'Patient',
//     },
//     {
//         IDUser: 4,
//         soDienThoai: '0123456789',
//         ten: 'Nguyễn Thị C',
//         ngaySinh: '1985-05-10',
//         gioiTinh: 'Nữ',
//         email: 'nguoibenh2@gmail.com',
//         userType: 'Patient',
//     },
//     {
//         IDUser: 5,
//         soDienThoai: '0123456789',
//         ten: 'Nguyễn Thị C',
//         ngaySinh: '1985-05-10',
//         gioiTinh: 'Nữ',
//         email: 'nguoibenh2@gmail.com',
//         userType: 'Patient',
//     },
//     {
//         IDUser: 6,
//         soDienThoai: '0123456789',
//         ten: 'Nguyễn Thị C',
//         ngaySinh: '1985-05-10',
//         gioiTinh: 'Nữ',
//         email: 'nguoibenh2@gmail.com',
//         userType: 'Patient',
//     },
//     {
//         IDUser: 7,
//         soDienThoai: '0123456789',
//         ten: 'Nguyễn Thị C',
//         ngaySinh: '1985-05-10',
//         gioiTinh: 'Nữ',
//         email: 'nguoibenh2@gmail.com',
//         userType: 'Patient',
//     },
//     {
//         IDUser: 8,
//         soDienThoai: '0123456789',
//         ten: 'Nguyễn Thị C',
//         ngaySinh: '1985-05-10',
//         gioiTinh: 'Nữ',
//         email: 'nguoibenh2@gmail.com',
//         userType: 'Patient',
//     },
//     {
//         IDUser: 9,
//         soDienThoai: '0123456789',
//         ten: 'Nguyễn Thị C',
//         ngaySinh: '1985-05-10',
//         gioiTinh: 'Nữ',
//         email: 'nguoibenh2@gmail.com',
//         userType: 'Patient',
//     },
//     {
//         IDUser: 10,
//         soDienThoai: '0123456789',
//         ten: 'Nguyễn Thị C',
//         ngaySinh: '1985-05-10',
//         gioiTinh: 'Nữ',
//         email: 'nguoibenh2@gmail.com',
//         userType: 'Patient',
//     },
//     // Thêm thông tin bệnh nhân khác nếu cần
// ];
const Patients = () => {
    const itemsPerPage = 100
    const [patients, setPatients] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    useEffect(() => {
        const fetchAllUsers = async () => {
            const { data } = await axios.get('/api/user')
            setPatients(data.slice(0, 1000))
            areaDataCache.user = data.slice(0, 1000)
        }
        if (!areaDataCache.user) {
            fetchAllUsers()
        }
        else {
            setPatients(areaDataCache.user)
        }
    }, [])
    const filteredItems = patients.filter(patient => patient.ten.toLowerCase().includes(searchTerm.toLowerCase()))
    const currPatient = filteredItems
    return (

        <div>
            <div className='title-wrap'>
                <div className='page-title'>
                    <p>Bệnh nhân</p>
                </div>
            </div>
            <div className='input-patient'>
                <SearchBar
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                />

            </div>
            <div className='patient-wrap'>
                <div className='wrap-title'>Danh sách bệnh nhân</div>
                {currPatient.map((patient) => (
                    <Link key={patient.IDUser} href={`/nhanvien/patients/detail/${patient.IDUser}`}>
                        <div className='patient-card'>
                            <div className='patient-info'>
                                <p>
                                    <strong>

                                        {patient.ten}
                                    </strong>
                                </p>
                                <p>Điện thoại: {patient.soDienThoai}</p>
                                <p>Email: {patient.email}</p>
                            </div>
                        </div>

                    </Link>
                ))}

            </div>

        </div>

    );
};

export default Patients;
