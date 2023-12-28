// API get oral health information
import { NextResponse } from 'next/server';
import { getOralHealthInfoByUserId } from '@/util/oralHealth';

// handle GET request
export async function GET(request) {
    try {
        const userId = request.params.id;

        if (userId) {
            const result = await getOralHealthInfoByUserId(userId);
            return NextResponse.json(result, { status: 200 });
        } else {
            return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
