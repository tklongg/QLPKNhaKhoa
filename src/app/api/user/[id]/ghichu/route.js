import { NextResponse } from 'next/server'
import { getUserDetailById, } from '@/util/user';
import { getChongChiDinhByUserId } from '@/util/thuoc';
import { db } from '@/util/db';

//get dentist 
export async function GET(request, {params}) {
    console.log("====", request.params)
    console.log("====", params)
    const userId = params.id
    console.log("🚀 ~ file: route.js:9 ~ GET ~ userId:", userId)
    try {
        // const result = await db.raw('SELECT 1+1 as result')
        const result = await db('UserTable').leftJoin('HoSoBenhNhan', 'UserTable.IDUser', '=', 'HoSoBenhNhan.IDBenhNhan')
        .join('ChongChiDinh', 'UserTable.IDUser', '=', 'ChongChiDinh.IDBenhNhan')
        .join('Thuoc', 'ChongChiDinh.IDThuoc', '=', 'Thuoc.IDThuoc')
        .where('UserTable.IDUser', userId)
        .groupBy('UserTable.IDUser', 'UserTable.soDienThoai', 'UserTable.email', 'UserTable.hoVaTen', 'UserTable.diaChi')
        .select('*')


        const chongChiDinh = await getChongChiDinhByUserId(+userId);
        console.log("🚀 ~ file: route.js:21 ~ GET ~ chongChiDinh:", chongChiDinh)
        console.log(result)
        return NextResponse.json(result, { status: 200 })
    } catch (error) {
        throw new Error(error)
        return NextResponse.json({ error: 'not gud' }, { status: 500 })
    }
}
