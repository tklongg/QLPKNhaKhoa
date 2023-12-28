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

export async function POST(request) {
    try {
        const requestData = await request.json();
        const appointmentId = requestData.appointmentId;
        const appointmentData = requestData.appointmentData;

        if (!appointmentId || !appointmentData) {
            throw new Error('Invalid input data for update');
        }

        // Call the update function
        const updatedResult = await updateAppointment(appointmentId, appointmentData);

        return NextResponse.json(updatedResult, { status: 200 });
    } catch (error) {
        console.error('Error in POST request:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}