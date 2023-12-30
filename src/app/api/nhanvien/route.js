import { NextResponse } from 'next/server'
import { db } from '@/util/db'

export async function GET(request) {
    // const result = await db.raw('SELECT 1+1 as result')
    try {
        const result = await db("UserTable").where({ "userType": "Employee" }).select()
        // console.log(result)
        return NextResponse.json(result, { status: 200 })
    } catch (error) {
        throw new Error(error)
        return NextResponse.json({ error: 'not gud' }, { status: 500 })
    }

}

export async function POST(request) {
    // const result = await db.raw('SELECT 1+1 as result')
    try {
        const {
            ten,
            ngaySinh,
            gioiTinh,
            soDienThoai,
            email
        } = await request.json()
        const exists = await db("UserTable").where({ "soDienThoai": soDienThoai }).select()
        if (exists.length > 0) {
            return NextResponse.json({ "error": "user already exists" }, { status: 500 })
        }
        else {
            const addData = {
                ten,
                ngaySinh,
                gioiTinh,
                soDienThoai,
                email
            }
            const result = await db("UserTable").insert(addData)
            console.log(result)
            return NextResponse.json(result, { status: 200 })
        }

    } catch (error) {
        throw new Error(error)
        return NextResponse.json({ error: 'not gud' }, { status: 500 })
    }

}
