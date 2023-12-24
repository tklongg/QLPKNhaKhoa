import { NextResponse } from 'next/server'
import { addUser } from '@/util/user'

export async function POST(request) {
    // const result = await db.raw('SELECT 1+1 as result')
    try {
        const { soDienThoai, ten, ngaySinh, gioiTinh, email } = await request.json()
        const newUser = await addUser(soDienThoai, ten, ngaySinh, gioiTinh, email)
        console.log(newUser)
        return NextResponse.json(newUser, { status: 200 })
    } catch (error) {
        throw new Error(error)
        return NextResponse.json({ error: 'not gud' }, { status: 500 })
    }

}
