import { hashPassword, isValidEmail } from "../../../utils/helpers";

import prisma from "@/prisma/client";
import { User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { message: "Please, provide a valid email address" },
      { status: 400 }
    );
  }
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user && user.password === hashPassword(password)) {
      return NextResponse.json(exclude(user, "password"));
    } else {
      return NextResponse.json(
        { message: "invalid credentials" },
        { status: 400 }
      );
    }
  } catch (error) {}
}

function exclude(user: any, keys: string) {
  for (let key of keys) {
    delete user[key];
  }
  return user;
}
