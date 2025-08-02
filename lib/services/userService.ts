import prisma from "@/lib/prisma";
import { hash } from "bcrypt";
import { UserRole, User, Event } from "@prisma/client";


interface UserData {
  username: string;
  email: string;
  password?: string;
  role: UserRole;
  isActive?: boolean;
  eventIds?: string[];
}

export const createUser = async (data: UserData) => {
  const { username, email, password, role, isActive, eventIds } = data;

  if (!username || !email || !password || !role) {
    throw new Error("Missing required fields");
  }

  const hashedPassword = await hash(password, 12);

  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
      role: role as UserRole,
      isActive,
      events: {
        create: eventIds ? eventIds.map(eventId => ({ event: { connect: { id: eventId } } })) : [],
      },
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

export const getUsers = async (
  search?: string,
  page: number = 1,
  limit: number = 10,
  sortKey: string = "username",
  sortOrder: string = "asc"
) => {
  const where: {
    OR?: {
      [key: string]: { contains: string; mode: "insensitive" } | { equals: UserRole };
    }[];
  } = {};
  if (search) {
    where.OR = [
      { username: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
      { role: { equals: search as UserRole } },
    ];
  }

  const [users, total] = await prisma.$transaction([
    prisma.user.findMany({
      where,
      orderBy: {
        [sortKey]: sortOrder,
      },
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        isActive: true,
        events: {
          select: {
            eventId: true,
          },
        },
      },
    }),
    prisma.user.count({ where }),
  ]);

  return {
    data: users.map((u) => ({
      ...u,
      eventIds: u.events.map(event => event.eventId),
    })),
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const updateUser = async (id: string, data: Partial<UserData>) => {
  const { username, email, role, isActive, eventIds } = data;

  const updatedUser = await prisma.user.update({
    where: { id },
    data: {
      username,
      email,
      role: role as UserRole,
      isActive,
      events: {
        deleteMany: {},
        create: eventIds ? eventIds.map(eventId => ({ event: { connect: { id: eventId } } })) : [],
      },
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: __, ...userWithoutPassword } = updatedUser;
  return userWithoutPassword;
};

export const deleteUser = async (id: string) => {
  await prisma.user.delete({
    where: { id },
  });
};