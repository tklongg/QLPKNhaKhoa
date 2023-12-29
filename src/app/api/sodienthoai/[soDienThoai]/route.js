import { NextResponse } from 'next/server'
import { addUserByPhone, getUserByPhone } from '@/util/user';

//get dentist 
export async function GET(request, { params }) {
    // const result = await db.raw('SELECT 1+1 as result')
    try {
        const phone = params.soDienThoai
        const result = await getUserByPhone(phone)
        if (!Array.isArray(result)) {
            throw new Error('Unexpected result format');
        }
        if (result[0]) {
            return NextResponse.json(result[0], { status: 200 })
        }
        else return NextResponse.json({ error: "cant find user" }, { status: 200 })
    } catch (error) {
        console.error('Error in GET request:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
        // throw new Error(error)
    }

}

export async function POST(request, { params }) {
    // const result = await db.raw('SELECT 1+1 as result')
    try {
        const phone = params.soDienThoai
        const result = await addUserByPhone(phone)
        return NextResponse.json(result, { status: 200 })
    } catch (error) {
        console.error('Error in GET request:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
        // throw new Error(error)
    }

}