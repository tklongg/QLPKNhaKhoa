import { NextResponse } from 'next/server'
import { getDentistDateSchedule, getDentistSchedule, getDentistScheduleById } from '@/util/dentist'

//get dentist 
export async function GET(request, { params }) {
    // const result = await db.raw('SELECT 1+1 as result')
    const IDNhaSi = params.id
    console.log(IDNhaSi)
    try {

        const result = await getDentistScheduleById(IDNhaSi)
        console.log("rs nè", result)

        return NextResponse.json(result, { status: 200 })
    } catch (error) {
        console.error('Error in GET request:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
        // throw new Error(error)
    }
}
