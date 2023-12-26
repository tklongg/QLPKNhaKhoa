import { NextResponse } from 'next/server'
import { getDentistFreeTime } from '@/util/dentist'

//get dentist 
export async function GET(request) {
    // const result = await db.raw('SELECT 1+1 as result')
    try {
        const {
            query: { date, dentistId },
            method,
        } = request;

        if (!date || !dentistId) {
            return NextResponse.json({ error: 'Invalid Data' }, { status: 500 });
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
