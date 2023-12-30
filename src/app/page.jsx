"use client"
import React, { useEffect } from "react"
import styles from "./page.module.scss"
import { useRouter } from "next/navigation"
export default function Home() {
  const router = useRouter()
  useEffect(() => {
    router.push('/login')
  }, [])
  return (
    <main className={styles.main}>
      <h1>hello everyone</h1>
    </main>
  )
}
