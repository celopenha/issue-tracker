import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../prisma/client";

export async function GET() {
  const users = await prisma.user.findMany({
    orderBy: {fullName: "asc"}
  });
  return NextResponse.json(users, { status: 200 });
}