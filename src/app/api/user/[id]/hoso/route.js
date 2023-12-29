import { NextResponse } from 'next/server'
import { updateThongTinTongQuan } from '@/util/hoso';

//get dentist 
export async function PATCH(request, { params }) {
    console.log("====", request.params)
    console.log("====", params)
    const { thongTinTongQuan } = request.json()
    const userId = params.id
    console.log("🚀 ~ file: route.js:9 ~ GET ~ userId:", userId)
    try {
        // const result = await db.raw('SELECT 1+1 as result')
        const result = await updateThongTinTongQuan({ IDUser: +userId, thongTinTongQuan: thongTinTongQuan });
        console.log(result)
        return NextResponse.json({ "success": "success" }, { status: 200 })
    } catch (error) {
        throw new Error(error)
        return NextResponse.json({ error: 'not gud' }, { status: 500 })
    }
}
