
import { NextResponse } from 'next/server'
import { db } from '@/util/db';

export async function PATCH(request, { params }) {
    const id = params.id;
    try {
        const { IDCuocHen,
            IDUser,
            IDNhaSi,
            IDTroKham,
            IDPhong,
            ngayHen,
            thoiGian,
            tinhTrang } = await request.json()
        console.log({
            IDCuocHen,
            IDUser,
            IDNhaSi,
            IDTroKham,
            IDPhong,
            ngayHen,
            thoiGian,
            tinhTrang
        })
        const result = await db('CuocHen').where('IDCuocHen', id)
            .update({
                IDNhaSi: IDNhaSi,
                IDTroKham: IDTroKham,
                IDPhong: IDPhong,
                thoiGian: thoiGian,
                ngayHen: ngayHen,
                tinhTrang: tinhTrang,
            })
        return NextResponse.json({ "success": "success" }, { status: 200 })
    } catch (error) {
        throw new Error(error)
        return NextResponse.json({ error: 'not gud' }, { status: 500 })
    }
}

export async function POST(request, { params }) {
    try {
        const { idBenhNhan, idNhaSi, idTroKham, soDienThoai, idPhong, thoiGian, ngayHen, tinhTrang } = await request.json()
        const newCuocHen = {
            IDBenhNhan: idBenhNhan,
            IDNhaSi: idNhaSi,
            IDTroKham: idTroKham,
            thoiGian: thoiGian,
            ngayHen: ngayHen,
            soDienThoai: soDienThoai,
            IDPhong: 101,
            tinhTrang: tinhTrang
        };

        const result = await db('CuocHen').insert(newCuocHen)
        console.log("🚀 ~ file: route.js:37 ~ POST ~ result:", result)

        return NextResponse.json(result, { status: 200 })
    } catch (error) {
        throw new Error(error)
        return NextResponse.json({ error: 'not gud' }, { status: 500 })
    }
}
