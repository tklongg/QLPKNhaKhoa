"use client"
import React, { useEffect, useState } from 'react';
import SearchBar from '@/src/components/SearchBar/SearchBar';
import Link from 'next/link';
import './dentist.css'
import axios from '@/util/axios';
// const dentists = [
//     {
//         IDUser: 1,
//         soDienThoai: '0987654321',
//         ten: 'Nguyễn Văn A',
//         ngaySinh: '1990-01-01',
//         gioiTinh: 'Nam',
//         email: 'nguoibenh1@gmail.com',
//         userType: 'Dentist',
//     },
//     {
//         IDUser: 2,
//         soDienThoai: '0123456789',
//         ten: 'Nguyễn Thị B',
//         ngaySinh: '1985-05-10',
//         gioiTinh: 'Nữ',
//         email: 'nguoibenh2@gmail.com',
//         userType: 'Dentist',
//     },
//     {
//         IDUser: 3,
//         soDienThoai: '0123456789',
//         ten: 'Nguyễn Thị C',
//         ngaySinh: '1985-05-10',
//         gioiTinh: 'Nữ',
//         email: 'nguoibenh2@gmail.com',
//         userType: 'Dentist',
//     },
//     // Thêm thông tin bệnh nhân khác nếu cần
// ];
const areaCache = {}
const Dentists = () => {
    const [dentists, setDentists] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    // const startIndex = (currentPage - 1) * itemsPerPage;
    // const endIndex = startIndex + itemsPerPage;
    useEffect(() => {
        const fetchAllDentists = async () => {
            const { data } = await axios.get('/api/dentist')
            setDentists(data.slice(0, 1000))
            areaCache.dentist = data.slice(0, 1000)
        }
        if (!areaCache.dentist) {
            fetchAllDentists()
        }
        else setDentists(areaCache.dentist)
    }, [])
    const filteredItems = dentists.filter(patient => patient.ten.toLowerCase().includes(searchTerm.toLowerCase()))
    const currPatient = filteredItems
    return (

        <div>
            <div className='title-wrap'>
                <div className='page-title'>
                    <p>Nha Sĩ</p>
                </div>
            </div>
            <div className='input-patient'>
                <SearchBar
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                />

            </div>
            <div className='patient-wrap'>
                <div className='wrap-title'>Danh sách nha sĩ</div>
                {currPatient.map((patient) => (
                    <Link key={patient.IDUser} href={`/dashboard/dentists/detail/${patient.IDUser}`}>
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

export default Dentists;