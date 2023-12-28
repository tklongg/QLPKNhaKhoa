"use client"
import { Inter } from 'next/font/google'
import { createContext, useState } from 'react'
// import { ToastContainer } from 'react-toastify'
const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({ children }) {

    return (
        <div className={inter.className}>
            {children}
            {/* <ToastContainer /> */}
        </div>

    )
}
