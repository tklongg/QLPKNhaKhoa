"use client"
import React, { useState, useRef } from 'react'
// import styles from './inputverify.module.scss'
import './inputverify.css'
const InputVerify = ({ stepArr, step, setStep, phone, onVerify }) => {
    const [code, setCode] = useState(Array(6).fill(''));
    const formRef = useRef(null);
    const handleBackStep = () => {
        setStep(stepArr[0])
    }
    const handleNextStep = () => {
        setStep(stepArr[2])
    }
    const update = (index, val) => {
        setCode((prevState) => {
            const slice = prevState.slice();
            slice[index] = val;
            return slice;
        });
    };

    const handleChange = (evt) => {
        const value = evt.currentTarget.value;
        const index = parseInt(evt.currentTarget.dataset.index, 10);
        const form = formRef.current;

        if (isNaN(index) || form === null) return;

        update(index, value[0] || "");


        if (value.length === 1 && index < code.length - 1) {
            const nextIndex = index + 1;
            const nextInput = form.querySelector(`.${`input-${nextIndex}`}`);
            console.log(nextInput)
            if (nextInput) {
                nextInput.focus();
            }
        }
    };

    const handleKeyDown = (evt) => {
        const index = parseInt(evt.currentTarget.dataset.index, 10);
        const form = formRef.current;

        if (isNaN(index) || form === null) return;

        const prevIndex = index - 1;
        const nextIndex = index + 1;
        const prevInput = form.querySelector(`.${`input-${prevIndex}`}`);
        const nextInput = form.querySelector(`.${`input-${nextIndex}`}`);
        console.log("prev input", prevInput)
        console.log("next input", nextInput)

        switch (evt.key) {
            case "Backspace":
                if (code[index]) {
                    update(index, "");
                } else if (prevInput) {
                    prevInput.focus();
                }
                break;
            case "ArrowRight":
                evt.preventDefault();
                if (nextInput) {
                    nextInput.focus();
                }
                break;
            case "ArrowLeft":
                evt.preventDefault();
                if (prevInput) {
                    prevInput.focus();
                }
                break;
        }
    };

    return (
        <form ref={formRef} onSubmit={onVerify} className='inputVerifyForm'>
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