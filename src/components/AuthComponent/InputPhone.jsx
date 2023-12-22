"use client"
import React, { useState, useEffect } from 'react'
import styles from './inputphone.module.scss'
const InputPhone = ({ stepArr, step, setStep, phone, setPhone }) => {
    const handleNextStep = () => {
        setStep(stepArr[1])
    }

    return (
        <div className={styles.input_phone_container}>
            <label htmlFor="phone">Nhập số điện thoại:</label>
            <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />
            <button onClick={handleNextStep}>Next</button>
        </div>
    )
}

export default InputPhone