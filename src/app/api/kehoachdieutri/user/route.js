// API get treatment plans
import { NextResponse } from 'next/server';
import { getAllTreatmentPlansByUserId } from '@/util/plan';
import { themKeHoachDieuTri } from '@/util/test';

// handle GET request
export async function GET(request) {
    try {
        const userId = request.params.id;

        if (userId) {
            // If user ID is provided in the URL, get all treatment plans by user ID
            const result = await getAllTreatmentPlansByUserId(userId);
            return NextResponse.json(result, { status: 200 });
        } else {
            return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}


