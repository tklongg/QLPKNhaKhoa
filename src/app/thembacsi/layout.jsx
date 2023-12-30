"use client"
import { Inter } from 'next/font/google'
import { createContext, useEffect, useState } from 'react'
// import { ToastContainer } from 'react-toastify'
import useLocalStorage from '@/src/hooks/useLocalStorage'
import { useRouter } from 'next/navigation'
const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({ children }) {
    const router = useRouter()
    const [userData, setUserData] = useLocalStorage("userData", '');
    useEffect(() => {
        if (userData.userType != "Employee" || userData.userType != "Admin") {
            router.replace('/dashboard')
        }
    }, [])
    return (
        <div className={inter.className}>
            {children}
            {/* <ToastContainer /> */}
        </div>

    )
}
