"use client"
import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import LichBacSi from '@/src/components/LichBacSi/LichBacSi'
import './style.css'


const page = () => {
    const params = useParams()
    const id = params.id

    return (
        <>
            <div className='title-wrap'>
                <div className='page-title'>
                    <p>Chi tiết nha sĩ</p>
                </div>
            </div>
            <div className='basic-info'>
                <div className="avatar-container">
                    <img
                        src="https://picsum.photos/200/300"
                        alt="Patient Avatar"
                        className="avatar"
                    />
                </div>
                <p className="patient-name"><strong>Nguyễn Văn A</strong></p>
            </div>
            <div>
                <LichBacSi />
            </div>



        </>
    )
}

export default page