// Calendar.jsx
import React, { useState } from 'react';
import './Calender.css';

const Calendar = ({ selectedDate, handleDateClick }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = [];

        for (let day = firstDay; day <= lastDay; day.setDate(day.getDate() + 1)) {
            daysInMonth.push(new Date(day));
        }

        return daysInMonth;
    };
    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }
    const daysInMonth = getDaysInMonth(currentMonth);

    const handlePrevMonth = (e) => {
        e.preventDefault()
        const prevMonth = new Date(currentMonth);
        prevMonth.setMonth(prevMonth.getMonth() - 1);
        setCurrentMonth(prevMonth);
    };

    const handleNextMonth = (e) => {
        e.preventDefault()
        const nextMonth = new Date(currentMonth);
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        setCurrentMonth(nextMonth);
    };

    return (
        <div className="calendar">
            <div className="month-navigation">
                <button onClick={handlePrevMonth}>&lt;</button>
                <h3>{new Intl.DateTimeFormat('vi-VN', { month: 'long', year: 'numeric' }).format(currentMonth)}</h3>
                <button onClick={handleNextMonth}>&gt;</button>
            </div>
            <div className="days">
                {daysInMonth.map((day) => (
                    <div
                        key={day.getDate()}
                        className={`day ${day.getMonth() === currentMonth.getMonth() ? '' : 'other-month'} ${selectedDate === formatDate(day) ? 'selected' : ''}`}
                        onClick={() => handleDateClick(formatDate(day))}
                    >
                        {day.getDate()}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Calendar;
