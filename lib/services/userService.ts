import prisma from "@/lib/prisma";
import { hash } from "bcrypt";
import { UserRole } from "@/app/generated/prisma";


interface UserData {
  username: string;
  email: string;
  password?: string;
  role: UserRole;
  isActive?: boolean;
  eventId?: string;
}

export const createUser = async (data: UserData) => {
  const { username, email, password, role, isActive, eventId } = data;

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
        create: eventId ? [{ event: { connect: { id: eventId } } }] : [],
      },
    },
  });

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
  const where: any = {};
  if (search) {
    where.OR = [
      { username: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
      { role: { equals: search as any } },
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
      eventId: u.events.length > 0 ? u.events[0].eventId : "",
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
  const { username, email, role, isActive, eventId } = data;

  const updatedUser = await prisma.user.update({
    where: { id },
    data: {
      username,
      email,
      role: role as UserRole,
      isActive,
      events: {
        deleteMany: {},
        create: eventId ? [{ event: { connect: { id: eventId } } }] : [],
      },
    },
  });

  const { password: _, ...userWithoutPassword } = updatedUser;
  return userWithoutPassword;
};

export const deleteUser = async (id: string) => {
  await prisma.user.delete({
    where: { id },
  });
};