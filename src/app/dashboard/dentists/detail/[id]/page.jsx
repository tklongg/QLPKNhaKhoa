"use client"
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import LichBacSi from '@/src/components/LichBacSi/LichBacSi'
import './style.css'
import { toast } from 'react-toastify'
import useLocalStorage from '@/src/hooks/useLocalStorage'
const page = () => {
    const [userData, setUserData] = useLocalStorage("userData", '')
    const params = useParams()
    const id = params.id
    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/user/${id}`)
            toast.info("delete thành công")
            router.replace(`/dashboard/employees`)
        } catch (error) {
            console.log(error)
            toast.error("delete không thành công")
        }
    }

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
            <div className='lich-bacsi'>
                <LichBacSi IDNhaSi={id} />
                {(userData.userType != "Dentist" && userData.userType != "Patient") && <button onClick={() => { handleDelete(id) }}>Xóa bác sĩ</button>
                }

            </div>



        </>
    )
}

export default page