import React, { useEffect, useState } from 'react'
import Pagination from '../Pagination/Pagination';
import AddTreatment from '../AddKeHoachDieuTri/AddKeHoachDieuTri';
import AdjustTreatment from '../SuaKeHoachDieuTri/SuaKeHoachDieuTri';
import './style.css'
import { useParams } from 'next/navigation';
import axios from '@/util/axios';

const loaiRang = {
    L: "Mặt trong",
    F: "Mặt ngoài",
    D: "Mặt xa",
    M: "Mặt gần",
    T: "Mặt đỉnh",
    R: "Mặt chân răng",
};

const khdt2 = [
    {
        IDKeHoachDieuTri: 1,
        IDNhaSi: 1,
        tenNhaSi: "Nguyen Van A",
        IDTroKham: 1,
        tenTroKham: "Nguyen Van B",
        IDDanhMuc: 1,
        tenDanhMuc: "Danh muc A",
        IDLieuTrinh: 1,
        tenLieuTrinh: "Lieu trinh 1",
        ngayDieuTri: "2023-12-28",
        moTa: `
            Rang em dep lam 
            Anh rat thich
        `,
        chiPhi: 500000.0,
        trangThai: "Kế hoạch",
        rang: [
            {
                IDLoaiMatRang: "M",
                STT: 1
            },
            {
                IDLoaiMatRang: "L",
                STT: 2
            },
            {
                IDLoaiMatRang: "L",
                STT: 3
            },
        ]
    },
    {
        IDKeHoachDieuTri: 2,
        IDNhaSi: 1,
        tenNhaSi: "Nguyen Van A",
        IDTroKham: 1,
        tenTroKham: "Nguyen Van B",
        IDDanhMuc: 1,
        tenDanhMuc: "Danh muc A",
        IDLieuTrinh: 1,
        tenLieuTrinh: "Lieu trinh 1",
        moTa: "Description",
        chiPhi: 500000.0,
        trangThai: "Đã hoàn thành",
        rang: [
            {
                IDLoaiMatRang: "L",
                STT: 1
            },
            {
                IDLoaiMatRang: "L",
                STT: 2
            },
            {
                IDLoaiMatRang: "L",
                STT: 3
            },
        ]
    },
    {
        IDKeHoachDieuTri: 3,
        IDNhaSi: 1,
        tenNhaSi: "Nguyen Van A",
        IDTroKham: 1,
        tenTroKham: "Nguyen Van B",
        IDDanhMuc: 1,
        tenDanhMuc: "Danh muc A",
        IDLieuTrinh: 1,
        tenLieuTrinh: "Lieu trinh 1",
        moTa: "Description",
        chiPhi: 500000.0,
        trangThai: "Đã hủy",
        rang: [
            {
                IDLoaiMatRang: "L",
                STT: 1
            },
            {
                IDLoaiMatRang: "L",
                STT: 2
            },
            {
                IDLoaiMatRang: "L",
                STT: 3
            },
        ]
    },
    {
        IDKeHoachDieuTri: 4,
        IDNhaSi: 1,
        tenNhaSi: "Nguyen Van A",
        IDTroKham: 1,
        tenTroKham: "Nguyen Van B",
        IDDanhMuc: 1,
        tenDanhMuc: "Danh muc A",
        IDLieuTrinh: 1,
        tenLieuTrinh: "Lieu trinh 1",
        moTa: "Description",
        chiPhi: 500000.0,
        trangThai: "Đã hủy",
        rang: [
            {
                IDLoaiMatRang: "L",
                STT: 1
            },
            {
                IDLoaiMatRang: "L",
                STT: 2
            },
            {
                IDLoaiMatRang: "L",
                STT: 3
            },
        ]
    },
    {
        IDKeHoachDieuTri: 5,
        IDNhaSi: 1,
        tenNhaSi: "Nguyen Van A",
        IDTroKham: 1,
        tenTroKham: "Nguyen Van B",
        IDDanhMuc: 1,
        tenDanhMuc: "Danh muc A",
        IDLieuTrinh: 1,
        tenLieuTrinh: "Lieu trinh 1",
        moTa: "Description",
        chiPhi: 500000.0,
        trangThai: "Đã hủy",
        rang: [
            {
                IDLoaiMatRang: "L",
                STT: 1
            },
            {
                IDLoaiMatRang: "L",
                STT: 2
            },
            {
                IDLoaiMatRang: "L",
                STT: 3
            },
        ]
    },
    {
        IDKeHoachDieuTri: 6,
        IDNhaSi: 1,
        tenNhaSi: "Nguyen Van A",
        IDTroKham: 1,
        tenTroKham: "Nguyen Van B",
        IDDanhMuc: 1,
        tenDanhMuc: "Danh muc A",
        IDLieuTrinh: 1,
        tenLieuTrinh: "Lieu trinh 1",
        moTa: "Description",
        chiPhi: 500000.0,
        trangThai: "Đã hủy",
        rang: [
            {
                IDLoaiMatRang: "L",
                STT: 1
            },
            {
                IDLoaiMatRang: "L",
                STT: 2
            },
            {
                IDLoaiMatRang: "L",
                STT: 3
            },
        ]
    },
]

const KhdtCard = ({ keHoach, handleAdjustTreatment }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isAddingDonThuoc, setIsAddingDonThuoc] = useState([])
    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };
    const handleAddDonThuoc = () => {
        setIsAddingDonThuoc(!isAddingDonThuoc);
    }
    return (
        <div className={`khdt-card ${keHoach.trangThai === 'Kế hoạch' ? 'khdt-planned' : keHoach.trangThai === 'Đã hoàn thành' ? 'khdt-completed' : 'khdt-cancelled'} }`} onClick={handleToggle}>
            <div className={`khdtcard-header ${keHoach.trangThai === 'Kế hoạch' ? 'khdt-planned' : keHoach.trangThai === 'Đã hoàn thành' ? 'khdt-completed' : 'khdt-cancelled'} }`}>
                <p><strong>Tên Danh Mục: {keHoach.tenDanhMuc}</strong></p>
                <p><strong>Chi Phí: {keHoach.chiPhi}</strong></p>
            </div>
            {isExpanded && (
                <div className="khdt-card-details">

                    <p> <strong>Mã Điều Trị</strong>: {keHoach.IDKeHoachDieuTri}</p>
                    <p><strong>Ngày Điều Trị</strong>: {keHoach.ngayDieuTri}</p>
                    <p><strong>Bác Sĩ Thực Hiện</strong>: {keHoach.tenNhaSi}</p>
                    {keHoach.IDTroKham != null && <p><strong>Trợ Khám</strong>: {keHoach.tenTroKham}</p>}

                    <p><strong>Danh Sách Răng</strong>:</p>
                    <ul className='tooth-list'>
                        {keHoach.rang.map((rang, index) => (
                            <li key={index}>{loaiRang[rang.IDLoaiMatRang]} răng &nbsp;
                                <strong>
                                    {rang.STT}
                                </strong>
                                &nbsp;
                                ({rang.IDLoaiMatRang} - {rang.STT})
                            </li>
                        ))}
                    </ul>
                    <p><strong>Mô Tả</strong>: {keHoach.moTa}</p>
                    <p><strong>Ghi Chú</strong>: {keHoach.ghiChu}</p>
                    <div className='adjust-treatment' onClick={handleAdjustTreatment}>
                        Sửa
                    </div>

                </div>
            )}
        </div>
    );
};

const Kehoachdieutri = () => {
    const params = useParams()
    console.log("params nè", params)
    const [doctors, setDoctors] = useState([])
    const [categories, setCategories] = useState([])
    const [treatments, setTreatments] = useState([])

    const [khdt, setKHDT] = useState(khdt2)
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddTreatment, setShowAddTreatment] = useState(false);
    const [showAdjustTreatment, setShowAdjustTreatment] = useState(false);
    const [adjustData, setAdjustData] = useState({})
    // const [filteredKhdt, setFilteredKhdt] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get(`/api/kehoachdieutri/user/${params.id}`)
            setKHDT(data)
            console.log("data hahaaha", data)

        }
        const fetchDoctors = async () => {
            const { data } = await axios.get('/api/dentist/getalldentist')
            // console.log(data)
            setDoctors(data.slice(0, 1000))
        }
        const fetchCategory = async () => {
            const { data } = await axios.get('/api/danhmuc')
            setCategories(data)
        }
        const fetchTreatment = async () => {
            const { data } = await axios.get('/api/lieutrinh')
            setTreatments(data)
        }
        fetchData()
        fetchDoctors()
        fetchCategory()
        fetchTreatment()
    }, [])
    const filteredKhdt = khdt.filter((keHoach) =>
        keHoach["IDKeHoachDieuTri"].toString().includes(searchTerm)
    );

    const startIndex = (currentPage - 1) * 5;
    const endIndex = startIndex + 5;

    const currentKhdt = filteredKhdt.slice(startIndex, endIndex);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleAdjustTreatment = (data) => {
        // setAdjustTreatment(true)

        setAdjustData({
            IDKeHoachDieuTri: data.IDKeHoachDieuTri,
            selectedDate: data.ngayDieuTri,
            selectedDoctor: { id: data.IDNhaSi, name: data.tenNhaSi },
            selectedAssistant: { id: data.IDTroKham, name: data.tenTroKham }, selectedCategory: data.IDDanhMuc,
            selectedTreatment: data.IDLieuTrinh,
            totalTeeth: data.rang,
            status: data.trangThai,
            chiPhi: data.chiPhi,
            moTa: data.moTa
        })
        setShowAdjustTreatment(true)
        console.log({
            selectedDate: data.ngayDieuTri,
            selectedDoctor: { id: data.IDNhaSi, name: data.tenNhaSi },
            selectedAssistant: { id: data.IDTroKham, name: data.tenTroKham }, selectedCategory: data.IDDanhMuc,
            selectedTreatment: data.IDLieuTrinh,
            totalTeeth: data.rang,
            status: data.trangThai,
            // chiPhi: data.chiPhi
        })
    }
    const handleSearchClick = () => {
        // Bạn có thể thêm xử lý tìm kiếm ở đây nếu cần
        console.log('Đang tìm kiếm:', searchTerm);
    };
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };
    const handleAddTreatment = (newTreatment) => {

    };
    return (
        <div className="khdt-container">
            <button className='btn-add-treatment' onClick={() => setShowAddTreatment(!showAddTreatment)}>
                {showAddTreatment ? 'Ẩn' : 'Thêm'}
            </button>
            <div className="search-container">
                <input
                    type="text"
                    id="search"
                    placeholder="Nhập mã kế hoạch điều trị..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />

            </div>
            <p style={{ fontSize: "22px" }}>
                <strong >
                    Kế hoạch điều trị

                </strong>
            </p>

            {showAddTreatment ? (
                <AddTreatment
                    doctors={doctors}
                    treatments={treatments}
                    categories={categories}
                />
            ) : showAdjustTreatment ? (
                <AdjustTreatment
                    IDKeHoachDieuTri={adjustData.IDKeHoachDieuTri}
                    date={adjustData.selectedDate}
                    doctor={adjustData.selectedDoctor}
                    assistant={adjustData.selectedAssistant}
                    category={adjustData.selectedCategory}
                    treatment={adjustData.selectedTreatment}
                    selectedTotalTeeth={adjustData.totalTeeth}
                    status={adjustData.status}
                    moTa={adjustData.moTa}
                    setShowAdjustTreatment={setShowAdjustTreatment}
                    doctors={doctors}
                    treatments={treatments}
                    categories={categories}
                />
            ) : <>
                {currentKhdt.map((keHoach) => (
                    <KhdtCard key={keHoach.IDKeHoachDieuTri} keHoach={keHoach} handleAdjustTreatment={() => handleAdjustTreatment(keHoach)} />
                ))}
                <Pagination
                    totalItems={khdt.length}
                    onPageChange={handlePageChange}
                />
            </>
            }

        </div>
    )
}

export default Kehoachdieutri