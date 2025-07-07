import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "../../../../generated/prisma";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const messageId: string = req.nextUrl.searchParams.get("message_id")!;
  let data = {};
  if (messageId.length === 24) {
    const transaction = await prisma.message.findFirst({
      where: {
        id: messageId,
      },
      select: {
        id: true,
        content: true,
        config: true,
      },
    });
    console.log("Transaction: ", transaction);
    if (transaction) data = transaction;
  }
  return NextResponse.json({
    status: Object.keys(data).length < 1 ? 400 : 200,
    data: data,
  });
}
