import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "../../../../generated/prisma";

const prisma = new PrismaClient();

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
  console.log(updatedConfig);
  console.log("Config updated in the db");
};

const deleteMessageData = async (messageId: string) => {
  await prisma.message.delete({
    where: {
      id: messageId,
    },
  });
  console.log("Message along with config deleted");
};

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
        contentBytes: true,
        config: true,
      },
    });
    console.log("Transaction: ", transaction);
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
    status: Object.keys(data).length < 1 ? 404 : 200,
    data: data,
  });
}
