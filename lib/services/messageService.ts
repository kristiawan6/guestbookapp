import prisma from "@/lib/prisma";

interface MessageData {
  name: string;
  email?: string;
  content: string;
}

export const createMessage = async (eventId: string, data: MessageData) => {
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
  limit: number = 10,
  sortKey: string = "timestamp",
  sortOrder: string = "desc"
) => {
  const where: {
    eventId: string;
    OR?: (
      | { content: { contains: string; mode: "insensitive" } }
      | { guest: { name: { contains: string; mode: "insensitive" } } }
    )[];
  } = { eventId };
  if (search) {
    where.OR = [
      { content: { contains: search, mode: "insensitive" } },
      { guest: { name: { contains: search, mode: "insensitive" } } },
    ];
  }

  const [messages, total] = await prisma.$transaction([
    prisma.message.findMany({
      where,
      include: {
        guest: true,
      },
      orderBy: {
        [sortKey]: sortOrder,
      },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.message.count({ where }),
  ]);

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


export const updateMessage = async (
  id: string,
  data: Partial<{ content: string; approved: boolean }>
) => {
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