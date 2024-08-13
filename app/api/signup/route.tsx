import { hashPassword, isValidEmail } from "@/utils/helpers";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { email, password, fullName, role } = await request.json();

  if (!password || !email || !fullName || !role) {
    return NextResponse.json(
      {
        message: "Please, provide all fields",
      },
      { status: 400 }
    );
  }
  if (!isValidEmail(email)) {
    return NextResponse.json(
      {
        message: "Please, provide a valid email address",
      },
      { status: 400 }
    );
  }
  if (password.length < 8) {
    return NextResponse.json(
      {
        message: "Invalid password (min length 8)",
      },
      { status: 400 }
    );
  }

  const checkUser = await prisma.user.findUnique({
    where: { email },
  });

  if (checkUser) {
    return NextResponse.json(
      { message: "This user already exists" },
      { status: 400 }
    );
  }

  try {
    const user = await prisma.user.create({
      data: {
        fullName,
        email,
        role,
        password: hashPassword(password),
      },
    });
    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong..." },
      { status: 500 }
    );
  }
}
