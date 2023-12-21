import { NextResponse } from 'next/server'
import { db } from '@/util/db'

export async function GET(request) {
    // const result = await db.raw('SELECT 1+1 as result')
    try {
        const result = await db.raw('SELECT 1+1 as result')
        console.log(result)
        return NextResponse.json({ success: 'conencted db' }, { status: 200 })
    } catch (error) {
        throw new Error(error)
        return NextResponse.json({ error: 'not gud' }, { status: 500 })
    }

}
