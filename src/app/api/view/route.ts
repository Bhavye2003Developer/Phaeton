import { NextRequest, NextResponse } from "next/server";
import { ApiResponse, ResponseStatus } from "@/lib/types";
import prisma from "@/lib/prisma";

const updateConfig = async (
  messageId: string,
  updatedConfig: {
    encryption: string;
    openLimit: number;
  }
) => {
  await prisma.config.update({
    where: {
      messageId,
    },
    data: {
      ...updatedConfig,
    },
  });
};

const deleteMessageData = async (messageId: string) => {
  await prisma.message.delete({
    where: {
      id: messageId,
    },
  });
};

export async function GET(
  req: NextRequest
): Promise<NextResponse<ApiResponse>> {
  const messageId: string = req.nextUrl.searchParams.get("message_id")!;
  let data = {};
  if (messageId.length === 24) {
    const transaction = await prisma.message.findFirst({
      where: {
        id: messageId,
      },
      select: {
        id: true,
        contentBytes: true,
        config: true,
      },
    });
    if (transaction) {
      if (transaction.config!.openLimit <= 1) {
        await deleteMessageData(messageId);
      } else {
        const config = { ...transaction.config! };
        const { id, messageId, ...configWithoutId } = config;
        configWithoutId.openLimit -= 1;
        await updateConfig(messageId, configWithoutId);
      }
      transaction.config!.openLimit -= 1;
      data = transaction;
    }
  }
  return NextResponse.json({
    status:
      Object.keys(data).length < 1
        ? ResponseStatus.NOT_FOUND
        : ResponseStatus.SUCCESS,
    data: data,
  });
}
