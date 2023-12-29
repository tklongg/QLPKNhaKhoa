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