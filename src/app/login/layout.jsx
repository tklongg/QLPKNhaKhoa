"use client"
import { Inter } from 'next/font/google'
import { createContext, useState } from 'react'
// import { ToastContainer } from 'react-toastify';
const inter = Inter({ subsets: ['latin'] })

export const AuthContext = createContext()
export const FirebaseContext = createContext()

export default function RootLayout({ children }) {
    const [auth, setAuth] = useState({})
    const [confirmationResult, setConfirmationResult] = useState({})
    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            <FirebaseContext.Provider value={{ confirmationResult, setConfirmationResult }}>
                <div className={inter.className}>
                    {children}
                </div>

            </FirebaseContext.Provider>
        </AuthContext.Provider>
    )
}
