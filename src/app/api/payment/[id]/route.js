// API get payment 
import { NextResponse } from 'next/server'
import { getAllPaymentId, getPaymentById } from '@/util/payment'

// handle GET request
export async function GET(request, { params }) {
    try {
        const id = params.id;
        console.log(id)
        if (id) {
            // If ID is provided in the URL, get payment by ID
            const result = await getPaymentById(id);
            return NextResponse.json(result, { status: 200 });
        } else {
            // If no ID is provided, get all payment IDs
            const result = await getAllPaymentId();
            return NextResponse.json(result, { status: 200 });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
