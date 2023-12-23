"use client"
import { Inter } from 'next/font/google'
import { createContext, useState } from 'react'
const inter = Inter({ subsets: ['latin'] })

export const AuthContext = createContext()
export const FirebaseContext = createContext()

export default function RootLayout({ children }) {
    const [auth, setAuth] = useState({})
    const [confirmationResult, setConfirmationResult] = useState({})
    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            <FirebaseContext.Provider value={{ confirmationResult, setConfirmationResult }}>
                <html lang="en">
                    <body className={inter.className}>{children}</body>
                </html>
            </FirebaseContext.Provider>
        </AuthContext.Provider>
    )
}
