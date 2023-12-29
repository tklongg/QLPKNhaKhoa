import { NextResponse } from 'next/server';
import { getAllDentistIds } from '@/util/dentist';

export async function GET(request) {
    try {
        const result = await getAllDentistIds();

        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        console.error('Error in GET request:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
