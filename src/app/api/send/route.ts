import { NextRequest, NextResponse } from "next/server";
import { ApiResponse, ResponseStatus } from "@/lib/types";
import prisma from "@/lib/prisma";

export async function POST(
  req: NextRequest
): Promise<NextResponse<ApiResponse>> {
  const data = await req.json();
  const messageBytes = data.messageBytes;
  const contentBytes = Uint8Array.from(
    Object.keys(messageBytes).map((index) => messageBytes[index])
  );
  const config = data.config;

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
    status: ResponseStatus.SUCCESS,
    data: returnData,
  });
}
