import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ThemLichTuan = ({ IDNhaSi, onThemThoiGianRanh, onClose }) => {
    const [selectedDays, setSelectedDays] = useState({
        mon: false,
        tue: false,
        wed: false,
        thu: false,
        fri: false,
        sat: false,
        sun: false,
    });

    const [weekStart, setWeekStart] = useState('');
    const [weekEnd, setWeekEnd] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Gửi dữ liệu lên server để thêm lịch tuần mới
            const response = await axios.post(`/api/dentist/weekly-availability/${IDNhaSi}`, {
                weekStart,
                weekEnd,
                selectedDays,
            });

            // Thực hiện các thao tác cập nhật state hoặc thông báo thành công tại đây (nếu cần)
            // onThemThoiGianRanh(response.data);

            // Reset form
            setWeekStart('');
            setWeekEnd('');
            setSelectedDays({
                mon: false,
                tue: false,
                wed: false,
                thu: false,
                fri: false,
                sat: false,
                sun: false,
            });
            toast.info("thêm xong em")
            // Đóng form sau khi thêm thành công
            onClose();
        } catch (error) {
            console.error('Lỗi khi thêm lịch tuần:', error);
            toast.error("lỗi rồi em")
            // Xử lý lỗi tại đây (hiển thị thông báo lỗi, gửi lỗi lên server, ...)
        }
    };

    return (
        <div>
            <h2>Thêm Lịch Tuần</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Tuần bắt đầu:
                    <input
                        type="date"
                        value={weekStart}
                        onChange={(e) => setWeekStart(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Tuần kết thúc:
                    <input
                        type="date"
                        value={weekEnd}
                        onChange={(e) => setWeekEnd(e.target.value)}
                        required
                    />
                </label>
                <div>
                    <p>Chọn ngày bác sĩ rãnh trong tuần:</p>
                    {Object.keys(selectedDays).map((day) => (
                        <label key={day}>
                            {day.charAt(0).toUpperCase() + day.slice(1)}:
                            <input
                                type="checkbox"
                                checked={selectedDays[day]}
                                onChange={() =>
                                    setSelectedDays((prevDays) => ({
                                        ...prevDays,
                                        [day]: !prevDays[day],
                                    }))
                                }
                            />
                        </label>
                    ))}
                </div>
                <div>
                    <button type="submit">Thêm</button>
                    <button type="button" onClick={onClose}>
                        Đóng
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ThemLichTuan;
