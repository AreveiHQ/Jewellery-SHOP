import Product from '@/models/productModel';
import { connect } from '@/dbConfig/dbConfig';

export async function GET(req) {
    const { search } = req.query; 

    try {
        await connect(); 

        // Search for products where the name or description contains the search term
        const products = await Product.find({
            $or: [
                { name: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
            ],
        });

        return new Response(JSON.stringify(products), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to fetch products" }), { status: 500 });
    }
}