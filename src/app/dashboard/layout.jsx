"use client"
import { Inter } from 'next/font/google'
import { createContext, useEffect, useState } from 'react'
// import { ToastContainer } from 'react-toastify';
import EmployeeSidebar from '@/src/components/EmployeeSidebar/EmployeeSidebar'
import './style.css';
import { useRouter } from 'next/navigation';
import useLocalStorage from '@/src/hooks/useLocalStorage';
import 'react-toastify/dist/ReactToastify.css';
const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({ children }) {
    const router = useRouter()
    const [userData, setUserData] = useLocalStorage("userData", '');
    // setUserData()
    useEffect(() => {
        // const setTestUserData = () => {
        //     setUserData({ id: 1, ten: "Long", userType: "Dentist" });
        // };
        // if (Object.keys(userData).length === 0) {
        //     setTestUserData();
        // }
        if (!userData.id) {
            router.push('/login');
        }
        // else {
        //     router.push('/nhanvien/appointments');
        // }
    }, [router, userData]);
    return (
        <div className='root-layout'>
            <EmployeeSidebar />
            <div className='root-layout-content'>{children}</div>
        </div>

    )
}
