import { NextResponse } from 'next/server'
import { db } from '@/util/db';

export async function POST(request, { params }) {
    const id = params.id;
    try {
        const {
            ngay,
            timeStart,
            timeEnd
        } = await request.json();
        console.log("hihi", {
            ngay,
            timeStart,
            timeEnd
        })
        const result = await db("LichNgay").insert({
            IDNhaSi: id,
            ngay: ngay,
            timeStart: timeStart,
            timeEnd: timeEnd
        })

        return NextResponse.json(result, { status: 200 })
    } catch (error) {
        console.error('Error in POST request:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}