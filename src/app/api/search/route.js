import Product from '@/models/productModel';
import { connect } from '@/dbConfig/dbConfig';
import { NextResponse } from 'next/server';

export async function GET(req) {
    await connect();

    const query = req.nextUrl.searchParams.get("query");
    console.log(query);
    
    try {
        const results = await Product.find({ $text: { $search: query } });
        return NextResponse.json(results);
    } catch (error) {
        return NextResponse.json({ error: "Error fetching products" }, { status: 500 });
    }
}
