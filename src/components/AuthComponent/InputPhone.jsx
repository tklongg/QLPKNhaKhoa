"use client"
import React, { useState, useEffect, useContext } from 'react'
import styles from './inputphone.module.scss'
import { fb } from '../../../util/firebase';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { FirebaseContext } from '@/src/app/login/layout';
import { normalizePhoneNumber } from '../../../util/phone'
const InputPhone = ({ stepArr, step, setStep, phone, setPhone }) => {
    const fbauth = getAuth();
    const { confirmationResult, setConfirmationResult } = useContext(FirebaseContext)
    useEffect(() => {
        setUpRecaptcha()

    }, [])
    const setUpRecaptcha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier(fbauth, 'btnSubmitPhone', {
            'size': 'invisible',
            'callback': (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                // ...
                // const appVerifier = window.recaptchaVerifier;
                // console.log(appVerifier)
                // console.log("ok con dê")
            },
            'expired-callback': () => {
                // Response expired. Ask user to solve reCAPTCHA again.
                // ...
                console.log("ko ok con dê")
            }
        });
    };
    const handleNextStep = async () => {
        const appVerifier = window.recaptchaVerifier;
        console.log(appVerifier)
        console.log("ok con dê")
        try {
            const normalizedPhoneNum = normalizePhoneNumber(phone)
            const confirmationResult = await signInWithPhoneNumber(fbauth, normalizedPhoneNum, appVerifier)
            window.confirmationResult = confirmationResult;
            setConfirmationResult(confirmationResult)
            console.log(confirmationResult)
            setStep(stepArr[1])
        } catch (error) {
            console.log(error)
        }
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
            <button id="btnSubmitPhone" onClick={handleNextStep} type='submit'>Next</button>

        </div>
    )
}

export default InputPhone