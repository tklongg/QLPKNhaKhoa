"use client"
import React, { useState, useEffect, useRef, useContext } from 'react'
// import styles from './inputverify.module.scss'
import { FirebaseContext } from '@/src/app/login/layout';
import { getAuth } from "firebase/auth";
import './inputverify.css'
import useLocalStorage from '@/src/hooks/useLocalStorage';
import axios from '@/util/axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
const InputVerify = ({ stepArr, step, setStep, phone, onVerify }) => {
    const router = useRouter()
    const [userData, setUserData] = useLocalStorage("userData", "")
    const [code, setCode] = useState(Array(6).fill(''));
    const formRef = useRef(null);
    const { confirmationResult, setConfirmationResult } = useContext(FirebaseContext)
    useEffect(() => {
        // Log the code whenever it changes
        console.log('Code:', getCode());
    }, [code]);
    const handleBackStep = () => {
        setStep(stepArr[0])
    }
    const handleNextStep = async (event) => {
        event.preventDefault();
        const strcode = getCode();
        confirmationResult.confirm(strcode).then((result) => {
            // User signed in successfully.
            // const user = result.user;
            console.log("okê con dê")
            try {
                const { data } = axios.get(`/api/sodienthoai/${phone}`)
                if (data.error) {
                    setStep(stepArr[2])
                }
                else if (data.IDUser) {
                    setUserData({ id: data.IDUser, ten: data.ten, userType: data.userType });
                    router.replace("/dashboard")
                }
            } catch (error) {
                toast.error(error.message)
                console.log(error)
            }

            // ...
        }).catch((error) => {
            // User couldn't sign in (bad verification code?)
            // ...
            console.log("ko okê con dê")
        });

    }
    const update = (index, val) => {
        setCode((prevState) => {
            const slice = prevState.slice();
            slice[index] = val;
            return slice;
        });
    };
    const updateCode = (index, value) => {
        setCode((prevCode) => {
            const newCode = [...prevCode];
            newCode[index] = value;
            return newCode;
        });
    };
    const handleChange = (evt) => {
        const value = evt.currentTarget.value;
        const index = parseInt(evt.currentTarget.dataset.index, 10);

        if (isNaN(index)) return;

        updateCode(index, value[0] || '');

        if (value.length === 1 && index < code.length - 1) {
            const nextIndex = index + 1;
            const nextInput = formRef.current.querySelector(`.input-${nextIndex}`);
            if (nextInput) {
                nextInput.focus();
            }
        }
    };

    const handleKeyDown = (evt) => {
        const index = parseInt(evt.currentTarget.dataset.index, 10);

        if (isNaN(index)) return;

        const form = formRef.current;
        const prevIndex = index - 1;
        const nextIndex = index + 1;
        const prevInput = form.querySelector(`.input-${prevIndex}`);
        const nextInput = form.querySelector(`.input-${nextIndex}`);

        switch (evt.key) {
            case 'Backspace':
                if (code[index]) {
                    updateCode(index, '');
                } else if (prevInput) {
                    prevInput.focus();
                }
                break;
            case 'ArrowRight':
                evt.preventDefault();
                if (nextInput) {
                    nextInput.focus();
                }
                break;
            case 'ArrowLeft':
                evt.preventDefault();
                if (prevInput) {
                    prevInput.focus();
                }
                break;
            default:
                break;
        }
    };
    // const handleChange = (evt) => {
    //     const value = evt.currentTarget.value;
    //     const index = parseInt(evt.currentTarget.dataset.index, 10);
    //     const form = formRef.current;

    //     if (isNaN(index) || form === null) return;

    //     update(index, value[0] || "");


    //     if (value.length === 1 && index < code.length - 1) {
    //         const nextIndex = index + 1;
    //         const nextInput = form.querySelector(`.${`input-${nextIndex}`}`);
    //         console.log(nextInput)
    //         if (nextInput) {
    //             nextInput.focus();
    //         }
    //     }
    // };

    // const handleKeyDown = (evt) => {
    //     const index = parseInt(evt.currentTarget.dataset.index, 10);
    //     const form = formRef.current;

    //     if (isNaN(index) || form === null) return;

    //     const prevIndex = index - 1;
    //     const nextIndex = index + 1;
    //     const prevInput = form.querySelector(`.${`input-${prevIndex}`}`);
    //     const nextInput = form.querySelector(`.${`input-${nextIndex}`}`);
    //     console.log("prev input", prevInput)
    //     console.log("next input", nextInput)

    //     switch (evt.key) {
    //         case "Backspace":
    //             if (code[index]) {
    //                 update(index, "");
    //             } else if (prevInput) {
    //                 prevInput.focus();
    //             }
    //             break;
    //         case "ArrowRight":
    //             evt.preventDefault();
    //             if (nextInput) {
    //                 nextInput.focus();
    //             }
    //             break;
    //         case "ArrowLeft":
    //             evt.preventDefault();
    //             if (prevInput) {
    //                 prevInput.focus();
    //             }
    //             break;
    //     }
    //     console.log(code)
    // };
    const getCode = () => {
        const f = formRef.current;
        // if (isNaN(index) || form === null) return;
        let strCode = ''
        for (let i = 0; i < 6; i++) {
            const inputN = document.querySelector(`.${`input-${i}`}`);
            if (inputN) {
                const val = inputN.value; ("value")
                if (val) {
                    strCode += val;
                }
            }
        }

        return strCode
    }
    return (
        <form ref={formRef} onSubmit={onVerify} className='inputVerifyForm'>
            {/* {showCode()} */}
            <div className='inputContainer'>
                {code.map((value, i) => (
                    <input
                        key={i}
                        value={value}
                        className={`input-${i}`}
                        type="text"
                        maxLength={1}
                        data-index={i}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                    />

                ))}
            </div>
            <div className='buttonContainer'>
                <button type="button" className='backButton' onClick={handleBackStep}>
                    Back
                </button>
                <button type="submit" className='verifyButton' onClick={handleNextStep}>
                    Confirm
                </button>
            </div>
        </form>
    );
}

export default InputVerify