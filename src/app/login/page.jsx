"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import InputPhone from '../../components/AuthComponent/InputPhone'
import InputVerify from '../../components/AuthComponent/InputVerify'
import InputNewUser from '../../components/AuthComponent/InputNewUser'
// import { connectDB } from '@/util/dbconfig';
// import { db } from '../../../util/db'
const stepArr = ["input_telephone", "submit_verify", "is_new_user"]
function LoginPage() {
    const [phone, setPhone] = useState("")
    const [step, setStep] = useState(stepArr[0])
    const showStep = () => {
        switch (step) {
            case stepArr[0]:
                return <InputPhone />
            case stepArr[1]:
                return <>Hello</>
            case stepArr[2]:
                return <>Hello 2</>
        }
    }
    return (
        <>
            <>Hello</>
            {showStep()}
        </>
    )
}

export default LoginPage