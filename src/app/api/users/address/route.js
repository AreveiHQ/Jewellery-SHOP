import Address from "@/models/addressModel";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { street, city, state, postalCode, country, landmark, apartmentNumber } = await req.json(); 
        const address = await Address.create({
            userId: req.userId, 
            street,
            city,
            state,
            postalCode,
            country,
            landmark,
            apartmentNumber
        });

        if (!address) {
            return NextResponse.json({
                message: "Error while adding address"
            });
        }

        return NextResponse.json({
            message: "User Address added successfully",
            address: address
        });
    } catch (err) {
        return NextResponse.json({
            message: "Server error",
            error: err.message
        });
    }
}

export async function GET(req) {
    try {
        const address = await Address.find({ userId: req.userId });
        if (!address) {
            return NextResponse.json({
                message: "Address Not Found"
            });
        }

        return NextResponse.json({
            address: address
        });
    } catch (err) {
        return NextResponse.json({
            message: "Server error",
            error: err.message
        });
    }
}
