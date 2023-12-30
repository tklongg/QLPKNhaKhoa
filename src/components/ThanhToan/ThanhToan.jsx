import axios from '@/util/axios'
import { useParams } from 'next/navigation'
import Pagination from '../Pagination/Pagination';
import React, { useEffect, useState } from 'react'
import useLocalStorage from '@/src/hooks/useLocalStorage';
import './style.css'
import { toast } from 'react-toastify';


const ThanhToanCard = ({ thanhToan }) => {
    const [isExpanded, setIsExpanded] = useState(false)
    const [userData, setUserData] = useLocalStorage("userData", "")
    const handleToggle = () => {
        setIsExpanded((prev) => !prev);
    };
    const handleThanhToan = async (IDThanhToan) => {
        // const inputMoney = prompt("Nhập số tiền trả")
        console.log("nè nha", IDThanhToan)
        var userInput = prompt('Nhập số:');
        console.log(userInput)
        if (userInput) {
            // Gọi hàm xử lý với số nhập vào
            const res = await axios.post(`/api/thanhtoan/${IDThanhToan}`, {
                tienTra: userInput.toString(),
            })



        }
    }
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
                    {
                        (thanhToan.tenTra == null && userData.userType != "Patient" && userData.userType != "Dentist") && <button className="btn-thanh-toan" onClick={() => handleThanhToan(thanhToan.IDThanhToan)}>Thanh Toán</button>
                    }

                </div>
            )}
        </div>
    );
}

const ThanhToan = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [thanhToan, setThanhToan] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const params = useParams()
    const userId = params.id
    console.log("params nè", params)
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };
    useEffect(() => {
        const fetchThanhToan = async () => {
            const { data } = await axios.get(`/api/thanhtoan/${userId}`)
            setThanhToan(data)

        }
        fetchThanhToan()
    }, [])

    const startIndex = (currentPage - 1) * 5;
    const endIndex = startIndex + 5;
    const filtered = thanhToan.filter((tt) =>
        tt.IDKeHoachDieuTri.toString().includes(searchTerm)
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