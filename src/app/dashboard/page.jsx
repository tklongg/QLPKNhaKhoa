'use client'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import './style.css'

const EmployeePage = () => {
    const router = useRouter()
    // useEffect(() => {
    //     router.push('/nhanvien/appointments');
    // }, [router]);

    return (

        <div>
            <h1>Employee hehe</h1>
            {/* Nội dung trang Patients */}
        </div>

    );
};

export default EmployeePage;
