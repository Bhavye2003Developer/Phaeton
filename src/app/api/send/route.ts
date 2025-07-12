import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "../../../../generated/prisma";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const data = await req.json();
  // console.log(data);

  const messageBytes = data.messageBytes;

  const contentBytes = Uint8Array.from(
    Object.keys(messageBytes).map((index) => messageBytes[index])
  );
  const config = data.config;
  // console.log("messageBytes: ", messageBytes, typeof messageBytes, bytes);

  const transaction = await prisma.message.create({
    data: {
      contentBytes: contentBytes,
      config: {
        create: {
          ...config,
        },
      },
    },
  });

  const returnData: {
    id?: string;
  } = {};
  if (transaction.id) {
    returnData.id = transaction.id;
  }

  return NextResponse.json({
    status: 200,
    data: returnData,
  });
}
