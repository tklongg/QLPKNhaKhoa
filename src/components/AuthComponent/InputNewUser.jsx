"use client"
import React from 'react';
import styles from './inputnewuser.module.scss';

const InputNewUser = ({ stepArr, step, setStep, name, setName, dob, setDOB }) => {
    const handleNextStep = () => {
        setStep(stepArr[3]);
    };

    const handleSelectChange = (key, value) => {
        setDOB({ ...dob, [key]: value });
    };

    return (
        <div className={styles['input-new-user-container']}>
            <label htmlFor="name">Họ và tên:</label>
            <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <div className={styles['dob-input']}>
                <label>Ngày tháng năm sinh:</label>
                <div className={styles['dob-dropdowns']}>
                    <select value={dob.date} onChange={(e) => handleSelectChange('date', parseInt(e.target.value, 10))}>
                        {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                            <option key={day} value={day}>{day}</option>
                        ))}
                    </select>

                    <select value={dob.month} onChange={(e) => handleSelectChange('month', parseInt(e.target.value, 10))}>
                        {Array.from({ length: 12 }, (_, i) => i).map((month) => (
                            <option key={month} value={month}>{month + 1}</option>
                        ))}
                    </select>

                    <select value={dob.year} onChange={(e) => handleSelectChange('year', parseInt(e.target.value, 10))}>
                        {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </div>
            </div>

            <button onClick={handleNextStep}>Next</button>
        </div>
    );
};

export default InputNewUser;
