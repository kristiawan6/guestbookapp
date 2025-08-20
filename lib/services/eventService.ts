import prisma from "@/lib/prisma";

interface EventData {
  name: string;
  description?: string;
  isActive?: boolean;
}

export const createEvent = async (data: EventData) => {
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
  limit: number = 10,
  sortKey: string = "name",
  sortOrder: string = "asc"
) => {
  const where: {
    OR?: (
      | { name: { contains: string; mode: "insensitive" } }
      | { description: { contains: string; mode: "insensitive" } }
    )[];
  } = {};
  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
    ];
  }

  const [events, total] = await prisma.$transaction([
    prisma.event.findMany({
      where,
      orderBy: {
        [sortKey]: sortOrder,
      },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        _count: {
          select: {
            guests: true,
            guestCategories: true,
            messages: true,
          },
        },
      },
    }),
    prisma.event.count({ where }),
  ]);

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
    include: {
      guestCategories: {
        select: {
          id: true,
          name: true,
          code: true,
          quota: true,
          _count: {
            select: {
              guests: true,
            },
          },
        },
        orderBy: {
          name: 'asc',
        },
      },
      _count: {
        select: {
          guests: true,
          messages: true,
          broadcastTemplates: true,
        },
      },
    },
  });
  return event;
};

export const updateEvent = async (id: string, data: Partial<EventData>) => {
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