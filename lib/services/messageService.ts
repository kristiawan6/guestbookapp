import prisma from "@/lib/prisma";

export const createMessage = async (eventId: string, data: any) => {
  const { name, email, content } = data;

  if (!name || !content) {
    throw new Error("Missing required fields");
  }

  const message = await prisma.message.create({
    data: {
      content,
      event: {
        connect: {
          id: eventId,
        },
      },
      guest: {
        create: {
          name,
          email,
          event: {
            connect: {
              id: eventId,
            },
          },
        },
      },
    },
  });

  return message;
};

export const getMessages = async (
  eventId: string,
  search?: string,
  page: number = 1,
  limit: number = 10
) => {
  const where: any = { eventId };
  if (search) {
    where.OR = [
      { content: { contains: search, mode: "insensitive" } },
      { guest: { name: { contains: search, mode: "insensitive" } } },
    ];
  }

  const messages = await prisma.message.findMany({
    where,
    include: {
      guest: true,
    },
    skip: (page - 1) * limit,
    take: limit,
    orderBy: {
      timestamp: "desc",
    },
  });

  const total = await prisma.message.count({ where });

  return {
    data: messages,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const updateMessageStatus = async (id: string, approved: boolean) => {
  const updatedMessage = await prisma.message.update({
    where: { id },
    data: {
      approved,
    },
  });

  return updatedMessage;
};

export const updateMessage = async (id: string, data: any) => {
  const { content, approved } = data;

  const updatedMessage = await prisma.message.update({
    where: { id },
    data: {
      content,
      approved,
    },
  });

  return updatedMessage;
};

export const deleteMessage = async (id: string) => {
  await prisma.message.delete({
    where: { id },
  });
};