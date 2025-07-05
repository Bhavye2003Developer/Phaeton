import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "../../../../generated/prisma";

const primsa = new PrismaClient();

export function POST(req: NextRequest) {
  const data = req.body;
  console.log(data);
  return NextResponse.json({
    status: 200,
  });
}
