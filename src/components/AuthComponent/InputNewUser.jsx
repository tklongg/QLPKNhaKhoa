"use client"
import React, { useEffect } from 'react';
import styles from './inputnewuser.module.scss';
import { addUser } from '../../../api/user'
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
// import { addUser } from '../../../util/user'
const InputNewUser = ({ stepArr, phone, setStep, name, setName, dob, setDOB, gioiTinh, setGioiTinh, email, setEmail }) => {
    useEffect(() => {
        setGioiTinh('Other');
        setDOB({ date: 1, month: 2, year: 2000 });
    }, []);
    const handleNextStep = async () => {
        const soDienThoai = phone
        const ngaySinh = getDOB()
        const ten = name
        if (ngaySinh != null && ten != "") {
            const newUser = await addUser({ soDienThoai, ten, ngaySinh, gioiTinh, email })
            console.log("ket qua: ", newUser)
            setStep(stepArr[3]);
            toast.info("Succeeded redirecting to home")
        }
        else {
            toast.error("Something wrong. Please try again!")
        }
    };
    const getDOB = () => {
        const day = dob.date;
        const month = dob.month;
        const year = dob.year;
        if (day && month && year) {

            return new Date(year, month, day);
        }
        else return null;
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
                placeholder=''
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
                            <option key={month} value={month}>{month}</option>
                        ))}
                    </select>

                    <select value={dob.year} onChange={(e) => handleSelectChange('year', parseInt(e.target.value, 10))}>
                        {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className={styles['gender-email-container']}>
                <div className={styles['gender-input']}>
                    <label htmlFor="gender">Giới tính:</label>
                    <select
                        id="gender"
                        value={gioiTinh}
                        onChange={(e) => setGioiTinh(e.target.value)}
                    >
                        <option value="Male">Nam</option>
                        <option value="Female">Nữ</option>
                        <option selected value="Other">Khác</option>
                    </select>
                </div>

                <div className={styles['email-input']}>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
            </div>

            <button onClick={handleNextStep}>Next</button>
        </div>
    );
};

export default InputNewUser;
