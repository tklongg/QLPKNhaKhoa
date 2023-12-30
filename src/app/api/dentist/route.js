import { getAllDentists } from "@/util/user"
import { NextResponse } from 'next/server'

export async function GET(request) {
    try {
        const users = await getAllDentists()
        // console.log(newUser)
        return NextResponse.json(users, { status: 200 })
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
            const userType = "Dentist"
            const addData = {
                ten,
                ngaySinh,
                gioiTinh,
                soDienThoai,
                email,
                userType
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
