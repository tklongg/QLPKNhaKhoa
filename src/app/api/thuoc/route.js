// API get payment 
import { getAllThuoc } from '@/util/thuoc';
import { NextResponse } from 'next/server'

// handle GET request
export async function GET(request) {
    try {
        const result = await getAllThuoc();
        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
