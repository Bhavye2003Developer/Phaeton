import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "../../../../generated/prisma";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const data = await req.json();
  console.log(data);

  const transaction = await prisma.message.create({
    data: {
      content: data.content,
      config: {
        create: {
          ...data.config,
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
