import prisma from "@/lib/prisma";

export const createEvent = async (data: any) => {
  const { name, description, isActive } = data;

  if (!name) {
    throw new Error("Missing required fields");
  }

  const event = await prisma.event.create({
    data: {
      name,
      description,
      isActive,
    },
  });

  return event;
};

export const getEvents = async (
  search?: string,
  page: number = 1,
  limit: number = 10
) => {
  const where: any = {};
  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
    ];
  }

  const events = await prisma.event.findMany({
    where,
    skip: (page - 1) * limit,
    take: limit,
  });

  const total = await prisma.event.count({ where });

  return {
    data: events,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getEventById = async (id: string) => {
  const event = await prisma.event.findUnique({
    where: { id },
  });
  return event;
};

export const updateEvent = async (id: string, data: any) => {
  const { name, description, isActive } = data;

  const updatedEvent = await prisma.event.update({
    where: { id },
    data: {
      name,
      description,
      isActive,
    },
  });

  return updatedEvent;
};

export const deleteEvent = async (id: string) => {
  await prisma.event.delete({
    where: { id },
  });
};