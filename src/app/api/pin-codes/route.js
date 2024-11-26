// app/api/pin-codes/route.js
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const filter_codes = searchParams.get('filter_codes');
    const token = process.env.NEXT_PUBLIC_DELHIVERY_API_KEY; // Replace with your actual token

    try {
        const response = await axios.get('https://api.delhivery.com/c/api/pin-codes/json/', {
            params: {
                token,
                filter_codes,
            },
        });
        return NextResponse.json(response.data);
    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: error.response?.status || 500 }
        );
    }
}
