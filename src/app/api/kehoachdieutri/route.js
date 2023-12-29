// API get treatment plans
import { NextResponse } from 'next/server';
import { themKeHoachDieuTri, suaKeHoachDieuTri } from '@/util/test';


export async function POST(request) {
    try {
        const { ngayDieuTri, IDBenhNhan, IDNhaSi, IDTroKham, IDDanhMuc, IDLieuTrinh, rang, chiPhi } = await request.json()
        // If user ID is provided in the URL, get all treatment plans by user ID
        const result = await themKeHoachDieuTri({ ngayDieuTri, IDBenhNhan, IDNhaSi, IDTroKham, IDDanhMuc, IDLieuTrinh, rang, chiPhi });
        console.log("đcmm", result)
        return NextResponse.json(result, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PATCH(request) {
    try {
        const { IDKeHoachDieuTri, ngayDieuTri, IDBenhNhan, IDNhaSi, IDTroKham, IDDanhMuc, IDLieuTrinh, rang, chiPhi, moTa, trangThai } = await request.json()
        // If user ID is provided in the URL, get all treatment plans by user ID
        const result = await suaKeHoachDieuTri({ IDKeHoachDieuTri, ngayDieuTri, IDBenhNhan, IDNhaSi, IDTroKham, IDDanhMuc, IDLieuTrinh, rang, chiPhi, moTa, trangThai });
        console.log("đcmm", result)
        return NextResponse.json({ "success": "ok" }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}