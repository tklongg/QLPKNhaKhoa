import { NextResponse } from 'next/server'
import { getUserByPhone } from '@/util/user';

//get dentist 
export async function GET(request) {
    // const result = await db.raw('SELECT 1+1 as result')
    try {
        const {
            query: { phone },
            method,
        } = request.params;
        console.log(phone)
        const result = await getUserByPhone(phone)
        if (!Array.isArray(result)) {
            throw new Error('Unexpected result format');
        }
        if (result[0]) {
            return NextResponse.json(result[0], { status: 200 })
        }
        else return NextResponse.json({ error: "cant find user" }, { status: 400 })
    } catch (error) {
        console.error('Error in GET request:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
        // throw new Error(error)
    }

}
