import { NextResponse } from 'next/server';
import { getDentistAppointmentsInDate } from '@/util/dentist';

export async function GET(request) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const date = searchParams.get('date');

        if (!date) {
            throw new Error('Invalid input data');
        }

        const appointmentIds = await getDentistAppointmentsInDate(date);

        return NextResponse.json(appointmentIds, { status: 200 });
    } catch (error) {
        console.error('Error in GET request:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
