import { NextResponse } from 'next/server'
import { getDentistAppointmentByDate } from '@/util/dentist'

export async function GET(request) {
    try {
        const {
            query: { date },
            method,
        } = request;
        const dentistId = request.nextUrl.searchParams.get("id")
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
    }
}

export async function POST(request) {
    try {
        const {
            query: { date },
            method,
        } = request;
        const dentistId = request.nextUrl.searchParams.get("id")
        if (!date || !dentistId) {
            throw new Error('Invalid input data');
        }
        const result = await getDentistAppointmentByDate(date, dentistId)
        if (!Array.isArray(result)) {
            throw new Error('Unexpected result format');
        }
        return NextResponse.json(result, { status: 200 })
    } catch (error) {
        console.error('Error in POST request:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}