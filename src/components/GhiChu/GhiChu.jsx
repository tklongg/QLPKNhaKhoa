import React, { useState, useEffect } from 'react'
import Pagination from '../Pagination/Pagination'
import AddCCD from './AddCCD/AddCCD'
import './style.css'
import { useParams } from 'next/navigation'
import axios from '@/util/axios'
const chongChiDinhArr = [
    {
        IDThuoc: 1,
        tenThuoc: "Thuoc 1"
    },
    {
        IDThuoc: 2,
        tenThuoc: "Thuoc 1"
    },
    {
        IDThuoc: 3,
        tenThuoc: "Thuoc 1"
    },
    {
        IDThuoc: 4,
        tenThuoc: "Thuoc 1"
    },
    {
        IDThuoc: 5,
        tenThuoc: "Thuoc 1"
    },
    {
        IDThuoc: 6,
        tenThuoc: "Thuoc 1"
    },
    {
        IDThuoc: 6,
        tenThuoc: "Thuoc 1"
    },
    {
        IDThuoc: 6,
        tenThuoc: "Thuoc 1"
    },

]


const ChongChiDinhCard = ({ thuoc }) => {
    return (
        <div className="chong-chi-dinh-card">
            <p>{`ID Thuốc: ${thuoc.IDThuoc}`}</p>
            <p>{`Tên Thuốc: ${thuoc.tenThuoc}`}</p>
        </div>
    );
};
const TextComponent = ({ text }) => {
    const lines = text.split('\n')
    return lines.map((line, index) => (
        <React.Fragment key={index}>
            <p>{line}</p>
        </React.Fragment>
    ));
}


const GhiChu = () => {
    // const [thongTin, setThongTin] = useState([])
    const params = useParams()
    const userId = params.id

    // const tinhTrangDiUng = `Dị ứng với Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima, quos!`
    // const ghiChu = `Không ăn uống Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt ducimus, necessitatibus vel officiis suscipit magni.`
    const [userInfo, setUserInfo] = useState({})
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('')
    const [addCCD, setAddCCD] = useState(false)
    // const [ghiChu, setGhiChu] = useState(gc)
    const [ccd, setCCD] = useState([])

    useEffect(() => {
        const fetchUserInfo = async () => {
            const { data } = await axios.get(`/api/user/${userId}/ghichu`)
            setUserInfo(data[0])
            setCCD(data[0]["chongChiDinh"])
            console.log("data nà", data[0]["chongChiDinh"])
        }
        fetchUserInfo()
    }, [])

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };
    // const filteredCCD = chongChiDinh.filter((ccd) =>
    //     ccd.tenThuoc.toLowerCase().includes(searchTerm.toLowerCase())

    // )
    const startIndex = (currentPage - 1) * 8;
    const endIndex = startIndex + 8;
    // const currentCCD = filteredCCD.slice(startIndex, endIndex)
    return (
        <div className='ghichu-container'>
            <button className='btn-add-treatment' onClick={() => setAddCCD((prev) => !prev)}>
                {addCCD ? 'Ẩn' : 'Thêm'}
            </button>
            {addCCD ? <AddCCD
                userInfo={userInfo}
                setUserInfo={setUserInfo}
                setCCDD={setCCD}
            /> : <React.Fragment>
                <div className='ghichu'>
                    <p>Ghi chú bệnh nhân</p>
                    {/* <TextComponent text={gc} /> */}
                    <p><strong>Tình trạng dị ứng</strong>: {userInfo != undefined ? userInfo.tinhTrangDiUng : "Không có"}</p>
                    <p><strong>Ghi chú bác sĩ</strong>: {userInfo != undefined ? userInfo.ghiChu : "Không có"}</p>
                </div>
                <p className='chong-chi-dinh-text'>Chống chỉ định các thuốc sau</p>
                <div className="chongchidinh-search-container">
                    <input
                        type="text"
                        id="search"
                        placeholder="Nhập tên thuốc..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />

                </div>
                <div className="chong-chi-dinh-list">
                    {ccd.map((thuoc) => (
                        <ChongChiDinhCard key={thuoc.IDThuoc} thuoc={thuoc} />
                    ))}
                </div>
                <Pagination
                    totalItems={ccd.length}
                    onPageChange={handlePageChange}
                />
            </React.Fragment>}


        </div>
    )
}

export default GhiChu