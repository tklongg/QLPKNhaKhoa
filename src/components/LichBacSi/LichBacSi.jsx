import React, { useState, useEffect } from 'react'
const lichNgayTest = [
    {
        "IDLich": 1,
        "IDNhaSi": 1,
        "ngay": "2023-01-01",
        "timeStart": "08:00:00",
        "timeEnd": "12:00:00"
    },
    {
        "IDLich": 2,
        "IDNhaSi": 1,
        "ngay": "2023-01-02",
        "timeStart": "09:00:00",
        "timeEnd": "13:00:00"
    },
    // Thêm các thông tin khác nếu cần
]
const lichTuanTest = [
    {
        "IDLich": 1,
        "IDNhaSi": 1,
        "weekStart": "2023-01-01",
        "weekEnd": "2023-01-07",
        "mon": 1,
        "tue": 1,
        "wed": 1,
        "thu": 0,
        "fri": 0,
        "sat": 0,
        "sun": 0
    },
    // Thêm các thông tin khác nếu cần
]
const lichThangTest = [
    {
        "IDLich": 1,
        "IDNhaSi": 1,
        "thang": 1,
        "nam": 2023,
        "ngayRanh": "1,2,3,4,5"
    },
    // Thêm các thông tin khác nếu cần
]
const LichBacSi = () => {

    const [lichNgay, setLichNgay] = useState(lichNgayTest);
    const [lichTuan, setLichTuan] = useState(lichTuanTest);
    const [lichThang, setLichThang] = useState(lichThangTest);
    useEffect(() => {
        // Gọi API hoặc backend để lấy dữ liệu và cập nhật state
        // Ví dụ: fetchLichNgay(), fetchLichTuan(), fetchLichThang()
        // setLichNgay(...);
        // setLichTuan(...);
        // setLichThang(...);
    }, []);
    return (
        <div className="lich-bac-si">
            {/* Hiển thị thông tin Lịch Ngày */}
            <div className="lich-ngay">
                <h2>Lịch Ngày</h2>
                {lichNgay.map((lich) => (
                    <div key={lich.IDLich}>
                        <p>{`Ngày: ${lich.ngay}, Thời gian: ${lich.timeStart} - ${lich.timeEnd}`}</p>
                    </div>
                ))}
            </div>

            {/* Hiển thị thông tin Lịch Tuần */}
            <div className="lich-tuan">
                <h2>Lịch Tuần</h2>
                {lichTuan.map((lich) => (
                    <div key={lich.IDLich}>
                        <p>{`Tuần từ ${lich.weekStart} đến ${lich.weekEnd}`}</p>
                        <p>{`Thứ Hai: ${lich.mon ? 'Có' : 'Không'}, Thứ Ba: ${lich.tue ? 'Có' : 'Không'}, ...`}</p>
                    </div>
                ))}
            </div>

            {/* Hiển thị thông tin Lịch Tháng */}
            <div className="lich-thang">
                <h2>Lịch Tháng</h2>
                {lichThang.map((lich) => (
                    <div key={lich.IDLich}>
                        <p>{`Tháng ${lich.thang}, Năm ${lich.nam}`}</p>
                        <p>{`Ngày Rảnh: ${lich.ngayRanh}`}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LichBacSi