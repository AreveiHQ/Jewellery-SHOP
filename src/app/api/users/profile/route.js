import { NextResponse } from "next/server";

const { connect } = require("@/dbConfig/dbConfig");
const { getDataFromToken } = require("@/helper/getDataFromToken");
const { default: User } = require("@/models/userModel");
connect();

export async function GET(req) {
        try {
                const userID = await getDataFromToken(req);
                const user = await User.findOne({_id:userID}).select("-password");
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