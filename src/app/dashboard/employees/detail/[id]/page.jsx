"use client"
import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import LichBacSi from '@/src/components/LichBacSi/LichBacSi'
import './style.css'
import axios from '@/util/axios'
import { toast } from 'react-toastify'
import useLocalStorage from '@/src/hooks/useLocalStorage'

const page = () => {
    const router = useRouter()
    const [userData, setUserData] = useLocalStorage("userData", "")
    const [userInfo, setUserInfo] = useState({})
    const params = useParams()
    const id = params.id
    useEffect(() => {
        const fetchDetailUser = async () => {
            const { data } = await axios.get(`/api/nhanvien/${id}`)
            setUserInfo(data[0])

        }
        fetchDetailUser()
    }, [])
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
                    <p>Chi tiết nhân viên</p>
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
                <p className="patient-name"><strong>{userInfo.ten}</strong></p>
            </div>
            <div className='lich-bacsi'>
                <p>Số điện thoại: {userInfo.soDienThoai}</p>
                <p>Ngày sinh: {userInfo.ngaySinh}</p>
                <p>Email: {userInfo.email}</p>
                {
                    userData.userType == "Admin" && <button onClick={() => { handleDelete(id) }}>Xóa nhân viên</button>
                }

            </div>
        </>
    )
}

export default page