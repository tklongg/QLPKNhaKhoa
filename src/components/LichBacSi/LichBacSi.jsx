import axios from '@/util/axios';
import React, { useState, useEffect } from 'react';
import moment from 'moment'; // Import moment library
import ThemThoiGianRanh from './ThemBacSi/ThemBacSi';
import "react-toastify/dist/ReactToastify.css"
import ThemLichTuan from './ThemTuan/ThemTuan';
const LichBacSi = ({ IDNhaSi }) => {
    const [lichNgay, setLichNgay] = useState([]);
    const [lichTuan, setLichTuan] = useState([]);
    const [lichThang, setLichThang] = useState([]);
    const [isThemThoiGianRanhVisible, setThemThoiGianRanhVisible] = useState(false);
    const [isThemTuan, setIsThemTuan] = useState(false);
    const [isThemThang, setIsThemThang] = useState(false);
    const handleThemThoiGianRanhToggle = () => {
        setThemThoiGianRanhVisible(!isThemThoiGianRanhVisible);
    };

    const handleThemThoiGianRanh = (newData) => {
        setLichNgay([...lichNgay, newData]);
    };

    const handleThemTuanToggle = () => {
        setIsThemTuan(!isThemTuan);
    };

    const handleThemTuan = (newData) => {
        setLichTuan([...lichTuan, newData]);
    };
    useEffect(() => {
        // Gọi API để lấy dữ liệu từ backend
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`/api/dentist/schedule/${IDNhaSi}`);

                // Chuẩn hóa định dạng ngày và giờ
                const formattedNgay = data.ngay.map((lich) => ({
                    ...lich,
                    ngay: moment(lich.ngay).format('YYYY-MM-DD'),
                    timeStart: moment(lich.timeStart).format('HH:mm'),
                    timeEnd: moment(lich.timeEnd).format('HH:mm'),
                }));

                const formattedTuan = data.tuan.map((lich) => ({
                    ...lich,
                    weekStart: moment(lich.weekStart).format('YYYY-MM-DD'),
                    weekEnd: moment(lich.weekEnd).format('YYYY-MM-DD'),
                    days: {
                        mon: lich.mon ? 'Có' : 'Không',
                        tue: lich.tue ? 'Có' : 'Không',
                        wed: lich.wed ? 'Có' : 'Không',
                        thu: lich.thu ? 'Có' : 'Không',
                        fri: lich.fri ? 'Có' : 'Không',
                        sat: lich.sat ? 'Có' : 'Không',
                        sun: lich.sun ? 'Có' : 'Không',
                    },
                }));

                // ... Tương tự cho lichThang

                setLichNgay(formattedNgay);
                setLichTuan(formattedTuan);
                setLichThang(data.thang);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu từ API:', error);
            }
        };

        fetchData();
    }, [IDNhaSi]); // Dependency array chứa IDNhaSi để useEffect chạy lại khi IDNhaSi thay đổi

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
                <button onClick={handleThemThoiGianRanhToggle}>Thêm Thời Gian Rãnh</button>
                {isThemThoiGianRanhVisible && (
                    <ThemThoiGianRanh
                        IDNhaSi={IDNhaSi}
                        onThemThoiGianRanh={handleThemThoiGianRanh}
                        onClose={handleThemThoiGianRanhToggle}
                    />
                )}
            </div>

            {/* Hiển thị thông tin Lịch Tuần */}
            <div className="lich-tuan">
                <h2>Lịch Tuần</h2>
                {lichTuan.map((lich) => (
                    <div key={lich.IDLich}>
                        <p>{`Tuần từ ${lich.weekStart} đến ${lich.weekEnd}`}</p>
                        <p>{`Thứ Hai: ${lich.days.mon}, Thứ Ba: ${lich.days.tue}, Thứ Tư: ${lich.days.wed}, Thứ Năm: ${lich.days.thu}, Thứ Sáu: ${lich.days.fri}, Thứ Bảy: ${lich.days.sat}, Chủ Nhật: ${lich.days.sun}`}</p>
                    </div>
                ))}
                <button onClick={(e) => setIsThemTuan((prev) => !prev)}>Thêm Thời Gian Rãnh</button>
                {isThemTuan && (
                    <ThemLichTuan
                        IDNhaSi={IDNhaSi}
                        onThemThoiGianRanh={handleThemTuan}
                        onClose={handleThemTuanToggle}
                    />
                )}
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
};

export default LichBacSi;
