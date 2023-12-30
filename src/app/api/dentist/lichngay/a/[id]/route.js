import { NextResponse } from 'next/server'
import { getDentistDateSchedule } from '@/util/dentist'

//get dentist 
export async function GET(request, { params }) {
    // const result = await db.raw('SELECT 1+1 as result')
    try {
        const {
            query: { date },
            method,
        } = request;
        const dentistId = request.nextUrl.searchParams.get("id")
        if (!date || !dentistId) {
            throw new Error('Invalid input data');
        }
        const result = await getDentistDateSchedule(date, dentistId)
        if (!Array.isArray(result)) {
            throw new Error('Unexpected result format');
        }
        return NextResponse.json(result, { status: 200 })
    } catch (error) {
        console.error('Error in GET request:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
        // throw new Error(error)
    }
}
