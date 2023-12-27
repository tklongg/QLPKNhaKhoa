import { NextResponse } from 'next/server'
import { getDentistAppointmentByDate } from '@/util/dentist'

export async function GET(request) {
    // const result = await db.raw('SELECT 1+1 as result')
    try {
        const {
            query: { date, IDNhaSi },
            method,
        } = request;
        // const date = searchParams.get('date')
        // const dentistId = searchParams.get('IDNhaSi')
        // const { date, dentistId } = await request.json()
        if (!date || !IDNhaSi) {
            throw new Error('Invalid input data');
        }
        const result = await getDentistAppointmentByDate(date, IDNhaSi)
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
