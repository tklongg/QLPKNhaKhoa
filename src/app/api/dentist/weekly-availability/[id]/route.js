import { NextResponse } from 'next/server'
import { db } from '@/util/db';

export async function POST(request, { params }) {
    const id = params.id;
    try {
        const {
            weekStart,
            weekEnd,
            selectedDays,
        } = await request.json();
        const existingWeeklyAvailability = await db('LichTuan')
            .where('IDNhaSi', id)
            .andWhere('weekStart', '>=', weekStart)
            .andWhere('weekEnd', '<=', weekEnd)
            .first();
        if (existingWeeklyAvailability) {
            throw new Error('Lịch tuần cho khoảng thời gian đã tồn tại.');
        }
        const addData = {
            IDNhaSi: id,
            weekStart,
            weekEnd,
            mon: selectedDays.mon,
            tue: selectedDays.tue,
            wed: selectedDays.wed,
            thu: selectedDays.thu,
            fri: selectedDays.fri,
            sat: selectedDays.sat,
            sun: selectedDays.sun
        }
        const result = await db("LichTuan").where({ "IDNhaSi": id }).insert(addData)
        return NextResponse.json(result, { status: 200 })
    } catch (error) {
        console.error('Error in POST request:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}