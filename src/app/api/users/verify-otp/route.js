import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import User from '@/models/userModel';
import { connect } from '@/dbConfig/dbConfig';

connect();

export async function POST(request) {
  try {
    const { email, otp, newPassword } = await request.json();

    // Find user by email, OTP, and check if OTP has not expired
    const user = await User.findOne({ email, otp, otpExpires: { $gt: Date.now() } });

    if (!user) {
      return NextResponse.json({ message: 'Invalid or expired OTP' }, { status: 400 });
    }

    // If OTP is valid, allow user to set a new password
    user.password = await bcrypt.hash(newPassword, 10); // Hash the new password
    user.otp = undefined; // Clear OTP after successful verification
    user.otpExpires = undefined; // Clear OTP expiry

    await user.save();

    return NextResponse.json({ message: 'Password updated successfully. You can now log in.' });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}
