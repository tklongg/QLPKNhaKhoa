import { NextResponse } from 'next/server'
import { db } from '@/util/db'

export async function GET(request, { params }) {
    // const result = await db.raw('SELECT 1+1 as result')
    const id = params.id
    try {
        const result = await db("UserTable").where({ "IDUser": id }).select()
        console.log(result)
        return NextResponse.json(result, { status: 200 })
    } catch (error) {
        throw new Error(error)
        return NextResponse.json({ error: 'not gud' }, { status: 500 })
    }

}

export async function DELETE(request, { params }) {
    // const result = await db.raw('SELECT 1+1 as result')
    const id = params.id
    try {
        await db("UserTable").where({ "IDUser": id }).del()
        console.log("đu me m vua phai thoi nha")
        return NextResponse.json({ "success": "ok" }, { status: 200 })
    } catch (error) {
        throw new Error(error)
        return NextResponse.json({ error: 'not gud' }, { status: 500 })
    }

}

