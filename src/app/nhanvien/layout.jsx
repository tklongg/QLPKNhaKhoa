"use client"
import { Inter } from 'next/font/google'
import { createContext, useEffect, useState } from 'react'
// import { ToastContainer } from 'react-toastify';
import EmployeeSidebar from '@/src/components/EmployeeSidebar/EmployeeSidebar'
import styles from './RootLayout.module.css';
import { useRouter } from 'next/navigation';
import useLocalStorage from '@/src/hooks/useLocalStorage';
const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({ children }) {
    const router = useRouter()
    const [userData, setUserData] = useLocalStorage("userData", '');
    // setUserData()
    useEffect(() => {
        const setTestUserData = () => {
            setUserData({ id: 1, ten: "Long", userType: "Dentist" });
        };
        if (Object.keys(userData).length === 0) {
            setTestUserData();
        }
        if (!userData.id) {
            router.push('/login');
        } else if (userData.userType === "User") {
            router.push('/dathen');
        } else {
            router.push('/nhanvien/appointments');
        }
    }, [router, userData]);
    return (
        <div className={`${styles.rootLayout} ${inter.className}`}>
            <EmployeeSidebar />
            <div className={styles.content}>{children}</div>
        </div>
    )
}
