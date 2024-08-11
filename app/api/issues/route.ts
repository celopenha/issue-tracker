import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../prisma/client";
import { issueSchema } from "../../validationSchema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth/authOptions";

export async function GET() {
  const issues = await prisma.issue.findMany();
  return NextResponse.json(issues, { status: 200 });
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({}, { status: 401 });
  }
  const body = await request.json();
  const validation = issueSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const user = await prisma.user.findUnique({
    where: { email: body.userEmail },
  });

  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
      user: {
        connect: {
          id: user!.id,
        },
      },
    },
  });

  return NextResponse.json(newIssue, { status: 201 });
}
