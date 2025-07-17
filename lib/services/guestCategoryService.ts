import prisma from "@/lib/prisma";

interface GuestCategoryData {
  name: string;
  description?: string;
  quota?: number;
  isActive?: boolean;
}

export const createGuestCategory = async (
  eventId: string,
  data: GuestCategoryData
) => {
  const { name, description, quota, isActive } = data;

  if (!name) {
    throw new Error("Missing required fields");
  }

  const existingCategory = await prisma.guestCategory.findFirst({
    where: {
      eventId,
      name: {
        equals: name,
        mode: "insensitive",
      },
    },
  });

  if (existingCategory) {
    throw new Error("Category Name Already Exist");
  }

  let code;
  let isCodeUnique = false;
  while (!isCodeUnique) {
    code = Math.random().toString(36).substring(2, 8).toUpperCase();
    const existingCode = await prisma.guestCategory.findFirst({
      where: {
        eventId,
        code,
      },
    });
    if (!existingCode) {
      isCodeUnique = true;
    }
  }

  const guestCategory = await prisma.guestCategory.create({
    data: {
      code,
      name,
      description,
      quota,
      isActive,
      event: {
        connect: {
          id: eventId,
        },
      },
    },
  });

  return guestCategory;
};

export const getGuestCategories = async (
  eventId: string,
  search?: string,
  page: number = 1,
  limit: number = 10
) => {
  const where: {
    eventId: string;
    OR?: (
      | { name: { contains: string; mode: "insensitive" } }
      | { code: { contains: string; mode: "insensitive" } }
      | { description: { contains: string; mode: "insensitive" } }
    )[];
  } = { eventId };
  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { code: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
    ];
  }

  const [guestCategories, total] = await prisma.$transaction([
    prisma.guestCategory.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.guestCategory.count({ where }),
  ]);

  return {
    data: guestCategories,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getGuestCategoryById = async (id: string) => {
  const guestCategory = await prisma.guestCategory.findUnique({
    where: { id },
  });

  if (!guestCategory) {
    throw new Error("Guest category not found");
  }

  return guestCategory;
};

export const updateGuestCategory = async (
  id: string,
  data: Partial<GuestCategoryData>
) => {
  const { name, description, quota, isActive } = data;

  if (name) {
    const existingCategory = await prisma.guestCategory.findFirst({
      where: {
        name: {
          equals: name,
          mode: "insensitive",
        },
        id: {
          not: id,
        },
      },
    });

    if (existingCategory) {
      throw new Error("Category Name Already Exist");
    }
  }

  const updatedGuestCategory = await prisma.guestCategory.update({
    where: { id },
    data: {
      name,
      description,
      quota,
      isActive,
    },
  });

  return updatedGuestCategory;
};

export const deleteGuestCategory = async (id: string) => {
  const guestCategory = await prisma.guestCategory.findUnique({
    where: { id },
    include: {
      guests: true,
    },
  });

  if (guestCategory?.guests && guestCategory.guests.length > 0) {
    throw new Error("Cannot delete category with assigned guests.");
  }

  await prisma.guestCategory.delete({
    where: { id },
  });
};