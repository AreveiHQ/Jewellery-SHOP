import { connect } from "@/dbConfig/dbConfig";
import { BadRequestError, InternalServerError } from "@/lib/errors";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; // Import the JWT package
import { NextResponse } from "next/server";
// Call the connect function to ensure the database connection is established
connect();

export async function POST(request) {
    try {
        const { name, email, phone, password } = await request.json();

        if (!name || !email || !password || !phone) {
            throw new BadRequestError('All fields are required');
        }

        // Check if a user already exists with the provided email
        const isUserExist = await User.findOne({ email });
        if (isUserExist) {
            throw new BadRequestError('User already exists with the same Email-ID');
        }

        // Hash the user's password for secure storage
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new user in the database
        const user = await User.create({
            name,
            email,
            phone,
            password: hashedPassword
        });

        if (!user) {
            throw new InternalServerError('Error while creating a user');
        }

        // Generate a JWT token for the created user
        const userId = user._id;
        const token = jwt.sign({ userId }, process.env.JWT_SECRET); // Make sure to set up JWT_SECRET in your environment variables

        // Return a successful response
        return NextResponse.json({
            message: "User created successfully",
            token: token
        }, { status: 201 });

    } catch (err) {
  
        return NextResponse.json({
            errors:err.isOperational?err:err.message,
            message: err.isOperational ? err.message : "Internal Server Error",
        }, { status: err.statusCode || 500 });
    }
}
