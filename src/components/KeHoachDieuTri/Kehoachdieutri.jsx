import React, { useState } from 'react'
import './style.css'

const loaiRang = {
    L: "Mặt trong",
    F: "Mặt ngoài",
    D: "Mặt xa",
    M: "Mặt gần",
    T: "Mặt đỉnh",
    R: "Mặt chân răng",
};
const khdt = [
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
        moTa: "Description",
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

]

const KhdtCard = ({ keHoach }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };

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
                    <ul class='tooth-list'>
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
                </div>
            )}
        </div>
    );
};

const Kehoachdieutri = () => {
    return (
        <div className="khdt-container">
            <p>
                <strong >
                    Kế hoạch điều trị

                </strong>
            </p>
            {khdt.map((keHoach) => (
                <KhdtCard key={keHoach.IDKeHoachDieuTri} keHoach={keHoach} />
            ))}
        </div>
    )
}

export default Kehoachdieutri