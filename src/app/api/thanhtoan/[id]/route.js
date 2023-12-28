
import { NextResponse } from 'next/server'
import { getUserDetailById, } from '@/util/user';
import { getChongChiDinhByUserId } from '@/util/thuoc';
import { db } from '@/util/db';


export async function PATCH(request, {params}) {
    const id = params.id;
     try {
         const { 
            tienTra,
            tienThoi,
            loaiThanhToan,
            ngayGiaoDich } = await request.json()
         const result = await db('ThanhToan').where('IDThanhToan', id )
         .update({
            tienTra,
            tienThoi,
            loaiThanhToan,
            ngayGiaoDich
         })
         return NextResponse.json(result, { status: 200 })
     } catch (error) {
         throw new Error(error)
         return NextResponse.json({ error: 'not gud' }, { status: 500 })
     }
 }