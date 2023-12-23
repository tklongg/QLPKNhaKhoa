"use client"
import React, { useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/router';
import { AuthContext } from './layout';
import InputPhone from '../../components/AuthComponent/InputPhone'
import InputVerify from '../../components/AuthComponent/InputVerify'
import InputNewUser from '../../components/AuthComponent/InputNewUser'
import styles from './login.module.scss'
import { fb } from '../../../util/firebase';
import { getAuth, RecaptchaVerifier } from "firebase/auth";


const stepArr = ["input_telephone", "submit_verify", "is_new_user", "redirect_to_home"]
function LoginPage() {
    const [phone, setPhone] = useState("")
    const [step, setStep] = useState(stepArr[0])
    // const [verifyCode, setVerifyCode] = useState("")
    const [name, setName] = useState("")
    const [dob, setDOB] = useState(new Date())
    // const { auth, setAuth } = useContext(AuthContext)


    const showStepName = () => {
        switch (step) {
            case stepArr[0]:
                return <p>Đăng nhập</p>
            case stepArr[1]:
                return <p>Nhập mã gửi đến điện thoại người dùng</p>
            case stepArr[2]:
                return <p>Nhập tên và ngày sinh</p>
        }
    }
    const showStep = () => {
        switch (step) {
            case stepArr[0]:
                return <InputPhone
                    stepArr={stepArr}
                    step={step}
                    setStep={setStep}
                    phone={phone}
                    setPhone={setPhone}
                />
            case stepArr[1]:
                return <InputVerify
                    stepArr={stepArr}
                    step={step}
                    setStep={setStep}
                    phone={phone}
                    // verifyCode={verifyCode}
                    // setVerifyCode={setVerifyCode}
                    onVerify={() => { }}
                />
            case stepArr[2]:
                return <InputNewUser
                    stepArr={stepArr}
                    step={step}
                    setStep={setStep}
                    name={name}
                    setName={setName}
                    dob={dob}
                    setDOB={setDOB}
                />
        }
    }
    return (
        <>
            <div className={styles.login_page}>
                <div className={styles.top_bar}>
                    {showStepName()}
                </div>
                {showStep()}
            </div>
        </>
    )
}

export default LoginPage