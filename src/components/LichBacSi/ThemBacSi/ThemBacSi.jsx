import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ThemThoiGianRanh = ({ IDNhaSi, onThemThoiGianRanh, onClose }) => {
    const [ngay, setNgay] = useState('');
    const [timeStart, setTimeStart] = useState('');
    const [timeEnd, setTimeEnd] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Gửi dữ liệu lên server để thêm thời gian rãnh mới
            const { data } = await axios.post(`/api/dentist/availability/${IDNhaSi}`, {
                ngay: ngay,
                timeStart: timeStart,
                timeEnd: timeEnd,
            });
            console.log("hasahs", {
                ngay,
                timeStart,
                timeEnd,
            })
            onThemThoiGianRanh(data);
            setNgay('');
            setTimeStart('');
            setTimeEnd('');
            onClose();
            toast.info("ok em")
        } catch (error) {
            toast.error("không em")
            console.error('Lỗi khi thêm thời gian rãnh:', error);
            // Xử lý lỗi tại đây (hiển thị thông báo lỗi, gửi lỗi lên server, ...)
        }
    };

    return (
        <div>
            <h2>Thêm Ngày Rãnh</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Ngày:
                    <input type="date" value={ngay} onChange={(e) => {
                        console.log(e.target.value)
                        setNgay(e.target.value)
                    }} required />
                </label>
                <br />
                <label>
                    Thời gian bắt đầu:
                    <input type="time" value={timeStart} onChange={(e) => {
                        console.log(e.target.value)
                        setTimeStart(e.target.value)
                    }} required />
                </label>
                <br />
                <label>
                    Thời gian kết thúc:
                    <input type="time" value={timeEnd} onChange={(e) => setTimeEnd(e.target.value)} required />
                </label>
                <br />
                <button type="submit">Thêm lịch ngày</button>
            </form>
        </div>
    );
};

export default ThemThoiGianRanh;
