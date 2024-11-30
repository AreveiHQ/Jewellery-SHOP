import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { UserAuth } from "@/utils/userAuth";
import { NextResponse } from "next/server";
connect();
export async function GET(req) {
  await connect();
        try {
                const userId =  UserAuth(request);
                const user = await User.findOne({_id:userId}).select("-password");
          return NextResponse.json(
            {
              message: 'User found',
              userData:user
            },
            { status: 200 }
          );
        } catch (err) {
              return NextResponse.json({message:err.message})
        }
      }