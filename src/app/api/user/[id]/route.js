import { NextResponse } from 'next/server'
import { getUserDetailById } from '@/util/user';

//get dentist 
export async function GET(request, {params}) {
    console.log("====", request.params)
    console.log("====", params)
    const userId = params.id
    console.log("🚀 ~ file: route.js:9 ~ GET ~ userId:", userId)
    try {
        // const result = await db.raw('SELECT 1+1 as result')
        const result = await getUserDetailById(+userId);
        console.log(result)
        return NextResponse.json(result, { status: 200 })
    } catch (error) {
        throw new Error(error)
        return NextResponse.json({ error: 'not gud' }, { status: 500 })
    }
}
