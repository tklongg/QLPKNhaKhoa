import { postChongChiDinh } from '@/util/thuoc'
import { NextResponse } from 'next/server'

export async function POST(request) {
    try {
        // const result = await db.raw('SELECT 1+1 as result')
        const {idBenhNhan, idThuoc} = await request.json()
        console.log("====", idBenhNhan)
        console.log("====", idThuoc)
        const result = await postChongChiDinh(idBenhNhan, idThuoc);
        console.log(result)
        return NextResponse.json(result, { status: 200 })
    } catch (error) {
        throw new Error(error)
        return NextResponse.json({ error: 'not gud' }, { status: 500 })
    }

}