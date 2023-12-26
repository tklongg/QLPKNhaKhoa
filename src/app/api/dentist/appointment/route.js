import { NextResponse } from 'next/server'
import { getDentistAppointmentByDate } from '@/util/dentist'

export async function GET(request) {
    // const result = await db.raw('SELECT 1+1 as result')
    try {
        const searchParams = request.nextUrl.searchParams
        const date = searchParams.get('date')
        const dentistId = searchParams.get('dentistId')
        // const { date, dentistId } = await request.json()
        if (!date || !dentistId) {
            throw new Error('Invalid input data');
        }
        const result = await getDentistAppointmentByDate(date, dentistId)
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
