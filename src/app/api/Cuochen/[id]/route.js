
import { NextResponse } from 'next/server'
import { db } from '@/util/db';

export async function POST(request, {params}) {
   const id = params.id;
    try {
        const { thoiGian, ngayHen, tinhTrang } = await request.json()
        const result = await db('CuocHen').where('IDCuocHen', id )
        .update({
          thoiGian: thoiGian,
          ngayHen: ngayHen,
          tinhTrang: tinhTrang,
        })
        return NextResponse.json(result, { status: 200 })
    } catch (error) {
        throw new Error(error)
        return NextResponse.json({ error: 'not gud' }, { status: 500 })
    }
}
