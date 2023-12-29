import { NextResponse } from 'next/server';
import { getDentistAppointmentsInDate } from '@/util/dentist';
import { getAllAppointments } from '@/util/cuochen';
import { db } from '@/util/db';
export async function GET(request) {
    try {
        // const searchParams = request.nextUrl.searchParams;
        // const date = searchParams.get('date');

        // if (!date) {
        //     throw new Error('Invalid input data');
        // }
        const appointments = await getAllAppointments()
        // const appointmentIds = await getDentistAppointmentsInDate(date);

        return NextResponse.json(appointments, { status: 200 });
    } catch (error) {
        console.error('Error in GET request:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        // const searchParams = request.nextUrl.searchParams;
        // const date = searchParams.get('date');

        // if (!date) {
        //     throw new Error('Invalid input data');
        // }
        const { IDBenhNhan, IDNhaSi, IDTroKham, thoiGian, ngayHen, IDPhong } = await request.json()
        const tinhTrang = "Cuộc hẹn mới"
        const result = await db("CuocHen").insert({
            IDBenhNhan, IDNhaSi, IDTroKham, thoiGian, ngayHen, IDPhong, tinhTrang
        })
        return NextResponse.json({ "sucesss": "success" }, { status: 200 });
        // const appointmentIds = await getDentistAppointmentsInDate(date);

        return NextResponse.json(appointments, { status: 200 });
    } catch (error) {
        console.error('Error in GET request:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
