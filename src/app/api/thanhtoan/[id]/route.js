
import { NextResponse } from 'next/server'
import { getUserDetailById, } from '@/util/user';
import { getChongChiDinhByUserId } from '@/util/thuoc';
import { db } from '@/util/db';
import { getAllThanhToanUser, updatePayment } from '@/util/thanhtoan';


export async function GET(request, { params }) {
    const id = params.id;
    try {
        const result = await getAllThanhToanUser(id)

        return NextResponse.json(result, { status: 200 })
    } catch (error) {
        throw new Error(error)
        return NextResponse.json({ error: 'not gud' }, { status: 500 })
    }
}

export async function POST(request, { params }) {
    const id = params.id;
    try {
        const { tienTra } = await request.json();
        console.log("mm", id, parseFloat(tienTra));

        // Rest of your code...

        const res = await updatePayment(id, parseFloat(tienTra));
        return NextResponse.json({ "success": 'gud' }, { status: 200 });
    } catch (error) {
        console.error('Error in POST request:', error);
        return NextResponse.json({ error: 'not gud' }, { status: 500 });
    }
}


// export async function PATCH(request, { params }) {
//     const id = params.id;
//     try {
//         const {
//             tienTra,
//             tienThoi,
//             loaiThanhToan,
//             ngayGiaoDich } = await request.json()
//         const result = await db('ThanhToan').where('IDThanhToan', id)
//             .update({
//                 tienTra,
//                 tienThoi,
//                 loaiThanhToan,
//                 ngayGiaoDich
//             })
//         return NextResponse.json(result, { status: 200 })
//     } catch (error) {
//         throw new Error(error)
//         return NextResponse.json({ error: 'not gud' }, { status: 500 })
//     }
// }