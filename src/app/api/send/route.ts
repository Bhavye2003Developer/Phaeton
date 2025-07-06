import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "../../../../generated/prisma";

const primsa = new PrismaClient();

export async function POST(req: NextRequest) {
  const data = await req.json();
  const content = data.content;
  console.log(content);

  await primsa.message.create({
    data: {
      content: content,
    },
  });

  return NextResponse.json({
    status: 200,
  });
}
