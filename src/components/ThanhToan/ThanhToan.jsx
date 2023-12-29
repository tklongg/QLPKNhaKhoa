import axios from '@/util/axios'
import { useParams } from 'next/navigation'
import Pagination from '../Pagination/Pagination';
import React, { useEffect, useState } from 'react'
import './style.css'
const thanhtoanArr = [
    {
        IDThanhToan: 1,
        IDKeHoachDieuTri: 1,
        tienTra: 800000.0,
        tienThoi: 300000.0,
        ngayGiaoDich: "2023-12-28",
        loaiThanhToan: "Tiền mặt",
        IDNhaSi: 1,
        tenNhaSi: "Nguyen Van A",
        IDTroKham: 1,
        tenTroKham: "Nguyen Van B",
        chiPhi: 500000.0
    },
    {
        IDThanhToan: 2,
        IDKeHoachDieuTri: 2,
        tienTra: 800000.0,
        tienThoi: 300000.0,
        ngayGiaoDich: "2023-12-28",
        loaiThanhToan: "Tiền mặt",
        IDNhaSi: 1,
        tenNhaSi: "Nguyen Van A",
        IDTroKham: 1,
        tenTroKham: "Nguyen Van B",
        chiPhi: 500000.0
    },
    {
        IDThanhToan: 2,
        IDKeHoachDieuTri: 2,
        tienTra: 800000.0,
        tienThoi: 300000.0,
        ngayGiaoDich: "2023-12-28",
        loaiThanhToan: "Tiền mặt",
        IDNhaSi: 1,
        tenNhaSi: "Nguyen Van A",
        IDTroKham: 1,
        tenTroKham: "Nguyen Van B",
        chiPhi: 500000.0
    },
    {
        IDThanhToan: 2,
        IDKeHoachDieuTri: 2,
        tienTra: 800000.0,
        tienThoi: 300000.0,
        ngayGiaoDich: "2023-12-28",
        loaiThanhToan: "Tiền mặt",
        IDNhaSi: 1,
        tenNhaSi: "Nguyen Van A",
        IDTroKham: 1,
        tenTroKham: "Nguyen Van B",
        chiPhi: 500000.0
    },
    {
        IDThanhToan: 2,
        IDKeHoachDieuTri: 2,
        tienTra: 800000.0,
        tienThoi: 300000.0,
        ngayGiaoDich: "2023-12-28",
        loaiThanhToan: "Tiền mặt",
        IDNhaSi: 1,
        tenNhaSi: "Nguyen Van A",
        IDTroKham: 1,
        tenTroKham: "Nguyen Van B",
        chiPhi: 500000.0
    },
    {
        IDThanhToan: 2,
        IDKeHoachDieuTri: 2,
        tienTra: 800000.0,
        tienThoi: 300000.0,
        ngayGiaoDich: "2023-12-28",
        loaiThanhToan: "Tiền mặt",
        IDNhaSi: 1,
        tenNhaSi: "Nguyen Van A",
        IDTroKham: 1,
        tenTroKham: "Nguyen Van B",
        chiPhi: 500000.0
    },
    {
        IDThanhToan: 2,
        IDKeHoachDieuTri: 2,
        tienTra: 800000.0,
        tienThoi: 300000.0,
        ngayGiaoDich: "2023-12-28",
        loaiThanhToan: "Tiền mặt",
        IDNhaSi: 1,
        tenNhaSi: "Nguyen Van A",
        IDTroKham: 1,
        tenTroKham: "Nguyen Van B",
        chiPhi: 500000.0
    },
    {
        IDThanhToan: 2,
        IDKeHoachDieuTri: 2,
        tienTra: 800000.0,
        tienThoi: 300000.0,
        ngayGiaoDich: "2023-12-28",
        loaiThanhToan: "Tiền mặt",
        IDNhaSi: 1,
        tenNhaSi: "Nguyen Van A",
        IDTroKham: 1,
        tenTroKham: "Nguyen Van B",
        chiPhi: 500000.0
    },
]

const ThanhToanCard = ({ thanhToan }) => {
    const [isExpanded, setIsExpanded] = useState(false)
    const handleToggle = () => {
        setIsExpanded((prev) => !prev);
    };
    return (
        <div className={`thanh-toan-card ${isExpanded ? 'expanded' : ''}`}>
            <div className="thanhtoan-header" onClick={handleToggle}>
                <p><strong>Thanh toán </strong>{`#${thanhToan.IDThanhToan}`}</p>
                <p><strong>Ngày giao dịch</strong>: {`${thanhToan.ngayGiaoDich}`}</p>
                <p><strong>Tổng chi phí</strong>: {`${thanhToan.chiPhi}`}</p>
            </div>

            {isExpanded && (
                <div className="thanhtoan-details" onClick={handleToggle}>
                    <p><strong>Mã Điều Trị:</strong> {thanhToan.IDKeHoachDieuTri}</p>
                    <p><strong>Bác Sĩ:</strong> {thanhToan.tenNhaSi}</p>
                    <p><strong>Trợ Khám:</strong> {thanhToan.tenTroKham}</p>
                    <p><strong>Loại Thanh Toán:</strong> {thanhToan.loaiThanhToan}</p>
                    <p><strong>Tiền Trả:</strong> {thanhToan.tienTra}</p>
                    <p><strong>Tiền Thối:</strong> {thanhToan.tienThoi}</p>

                    <button className="btn-thanh-toan" onClick={() => alert('Xử lý thanh toán')}>Thanh Toán</button>
                </div>
            )}
        </div>
    );
}

const ThanhToan = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [thanhToan, setThanhToan] = useState(thanhtoanArr)
    const [searchTerm, setSearchTerm] = useState("")
    const params = useParams()
    const userId = params.id
    console.log("params nè", params)
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };
    const startIndex = (currentPage - 1) * 5;
    const endIndex = startIndex + 5;
    const filtered = thanhToan.filter((thanhToan) =>
        thanhToan.IDKeHoachDieuTri.toString().includes(searchTerm)
    )
    const currentTT = filtered.slice(startIndex, endIndex)
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const result = await axios.get('/api/users/')
    //         setThanhToan(result)
    //     }
    //     fetchData()
    // }, [])
    return (
        <div className="thanhtoan-container">
            <div className="thanhtoan-search-container">
                <input
                    type="text"
                    id="search"
                    placeholder="Nhập mã kế hoạch điều trị..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />

            </div>
            <div className='thanh-toan-data'   >
                {currentTT.map(item => (
                    <ThanhToanCard thanhToan={item} />
                ))}
                <Pagination
                    totalItems={thanhToan.length}
                    onPageChange={handlePageChange}
                />
            </div>


        </div>
    )
}

export default ThanhToan