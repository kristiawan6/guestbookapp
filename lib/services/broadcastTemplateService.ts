import prisma from "@/lib/prisma";
import { BroadcastType } from "@/app/generated/prisma";

export const createBroadcastTemplate = async (eventId: string, data: any) => {
  const {
    name,
    type,
    content,
    subject,
    footerMessage,
    button,
    imageAttachment,
  } = data;

  if (!name || !type || !content) {
    throw new Error("Missing required fields");
  }

  const broadcastTemplate = await prisma.broadcastTemplate.create({
    data: {
      name,
      type: type as BroadcastType,
      content,
      subject,
      footerMessage,
      button,
      imageAttachment,
      event: {
        connect: {
          id: eventId,
        },
      },
    },
  });

  return broadcastTemplate;
};

export const getBroadcastTemplates = async (
  eventId: string,
  search?: string,
  page: number = 1,
  limit: number = 10
) => {
  const where: any = { eventId };
  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { content: { contains: search, mode: "insensitive" } },
    ];
  }

  const broadcastTemplates = await prisma.broadcastTemplate.findMany({
    where,
    skip: (page - 1) * limit,
    take: limit,
  });

  const total = await prisma.broadcastTemplate.count({ where });

  return {
    data: broadcastTemplates,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const updateBroadcastTemplate = async (id: string, data: any) => {
  const {
    name,
    type,
    content,
    subject,
    footerMessage,
    button,
    imageAttachment,
  } = data;

  const updatedBroadcastTemplate = await prisma.broadcastTemplate.update({
    where: { id },
    data: {
      name,
      type: type as BroadcastType,
      content,
      subject,
      footerMessage,
      button,
      imageAttachment,
    },
  });

  return updatedBroadcastTemplate;
};

export const deleteBroadcastTemplate = async (id: string) => {
  await prisma.broadcastTemplate.delete({
    where: { id },
  });
};