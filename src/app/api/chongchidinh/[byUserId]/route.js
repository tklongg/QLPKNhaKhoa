import { NextResponse } from 'next/server'
import { db } from '@/util/db'
import { getChongChiDinhByUserId } from '@/util/thuoc'

export async function GET(request, { params }) {
    console.log("====", request.params)
    console.log("====", params)
    const userId = params.byUserId
    try {
        // const result = await db.raw('SELECT 1+1 as result')
        const result = await getChongChiDinhByUserId(+userId);
        console.log(result)
        return NextResponse.json(result, { status: 200 })
    } catch (error) {
        throw new Error(error)
        return NextResponse.json({ error: 'not gud' }, { status: 500 })
    }
}


//body


