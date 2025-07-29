import prisma from "@/lib/prisma";
import { BroadcastType } from "@/app/generated/prisma";

const parseBroadcastType = (type: string): BroadcastType | undefined => {
  if (!type) return undefined;
  const lowerCaseType = type.toLowerCase();
  if (lowerCaseType === "whatsapp") {
    return BroadcastType.WhatsApp;
  }
  if (lowerCaseType === "email") {
    return BroadcastType.Email;
  }
  return undefined;
};

interface BroadcastTemplateData {
  name: string;
  type: string;
  content: string;
  subject?: string;
  footer?: string;
  footerMessage?: string;
  button?: string;
  imageAttachment?: string;
  imageAttachmentType?: string;
}

export const createBroadcastTemplate = async (
  eventId: string,
  data: BroadcastTemplateData
) => {
  const {
    name,
    type,
    content,
    subject,
    footer,
    footerMessage,
    button,
    imageAttachment,
    imageAttachmentType,
  } = data;

  if (!name || !type || !content) {
    throw new Error("Missing required fields");
  }

  const parsedType = parseBroadcastType(type);
  if (!parsedType) {
    throw new Error(`Invalid broadcast type provided: ${type}`);
  }

  const broadcastTemplate = await prisma.broadcastTemplate.create({
    data: {
      name,
      type: parsedType,
      content,
      subject,
      footerMessage: footer || footerMessage,
      button,
      imageAttachment,
      imageAttachmentType,
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
  limit: number = 10,
  type?: string
) => {
  const where: {
    eventId: string;
    OR?: (
      | { name: { contains: string; mode: "insensitive" } }
      | { content: { contains: string; mode: "insensitive" } }
    )[];
    type?: BroadcastType;
  } = { eventId };
  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { content: { contains: search, mode: "insensitive" } },
    ];
  }
  if (type) {
    const parsedType = parseBroadcastType(type);
    if (parsedType) {
      where.type = parsedType;
    }
  }

  const [broadcastTemplates, total] = await prisma.$transaction([
    prisma.broadcastTemplate.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.broadcastTemplate.count({ where }),
  ]);

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

export const getBroadcastTemplateById = async (id: string) => {
  const broadcastTemplate = await prisma.broadcastTemplate.findUnique({
    where: { id },
  });

  if (!broadcastTemplate) {
    throw new Error("Broadcast template not found");
  }

  return broadcastTemplate;
};

export const updateBroadcastTemplate = async (
  id: string,
  data: Partial<BroadcastTemplateData>
) => {
  const {
    name,
    type,
    content,
    subject,
    footer,
    footerMessage,
    button,
    imageAttachment,
    imageAttachmentType,
  } = data;

  const dataToUpdate: {
    name?: string;
    content?: string;
    subject?: string;
    footerMessage?: string;
    button?: string;
    imageAttachment?: string;
    imageAttachmentType?: string;
    type?: BroadcastType;
  } = {
    name,
    content,
    subject,
    footerMessage: footer || footerMessage,
    button,
    imageAttachment,
    imageAttachmentType,
  };

  if (type) {
    const parsedType = parseBroadcastType(type);
    if (!parsedType) {
      throw new Error(`Invalid broadcast type provided: ${type}`);
    }
    dataToUpdate.type = parsedType;
  }

  const updatedBroadcastTemplate = await prisma.broadcastTemplate.update({
    where: { id },
    data: dataToUpdate,
  });

  return updatedBroadcastTemplate;
};

export const deleteBroadcastTemplate = async (id: string) => {
  await prisma.broadcastTemplate.delete({
    where: { id },
  });
};