// src/app/api/slides/[section]/route.js
import Home from "@/models/homePageModel";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    const { section } = params;

    try {
        const slides = await Home.find({ section });
        if (!slides.length) {
            return NextResponse.json({ message: "No slides found in this section" }, { status: 404 });
        }
        return NextResponse.json({ slides }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}
