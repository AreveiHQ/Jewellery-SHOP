// src/app/api/users/login/route.js
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '@/models/userModel';
import { connect } from '@/dbConfig/dbConfig';
import { BadRequestError } from '@/lib/errors';

connect();

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    const user = await User.findOne({ email });

    if (!user) {
      throw new BadRequestError('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new BadRequestError('Invalid credentials');
    }

    const userId = user._id;
    const token = jwt.sign({ userId }, process.env.JWT_SECRET);

    return NextResponse.json(
      {
        message: 'Sign-in successful',
        token: token,
      },
      { status: 200 }
    );
  } catch (err) {
        return NextResponse.json({
                errors:err.isOperational?err:err.message,
                message: err.isOperational ? err.message : "Internal Server Error",
            }, { status: err.statusCode || 500 });
  }
}
