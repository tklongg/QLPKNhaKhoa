import { NextResponse } from 'next/server';
import { getAllDentistIds } from '@/util/dentist';

export async function GET(request) {
    try {
        const dentistIds = await getAllDentistIds();

        return NextResponse.json({ dentistIds }, { status: 200 });
    } catch (error) {
        console.error('Error in GET request:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
