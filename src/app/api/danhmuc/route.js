import { NextResponse } from 'next/server'
import { getAllDanhMuc } from '@/util/danhmuc'

export async function GET(request) {
    // const result = await db.raw('SELECT 1+1 as result')
    try {
        const result = await getAllDanhMuc()
        console.log(result)
        return NextResponse.json(result, { status: 200 })
    } catch (error) {
        throw new Error(error)
        return NextResponse.json({ error: 'not gud' }, { status: 500 })
    }

}
