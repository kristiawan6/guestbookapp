import prisma from "@/lib/prisma";
import { hash } from "bcrypt";
import { UserRole } from "@/app/generated/prisma";

export const createUser = async (data: any) => {
  const { username, password, role, eventIds } = data;

  if (!username || !password || !role) {
    throw new Error("Missing required fields");
  }

  const hashedPassword = await hash(password, 12);

  const user = await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
      role: role as UserRole,
      events: {
        create: eventIds?.map((eventId: string) => ({
          event: {
            connect: {
              id: eventId,
            },
          },
        })),
      },
    },
    include: {
      events: {
        select: {
          eventId: true,
        },
      },
    },
  });

  // Omit password from the returned object
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

export const getUsers = async () => {
  const users = await prisma.user.findMany({
    where: {
      role: "AdminEvents",
    },
    select: {
      id: true,
      username: true,
      role: true,
      events: {
        select: {
          eventId: true,
        },
      },
    },
  });
  return users;
};

export const updateUser = async (id: string, data: any) => {
  const { username, role, eventIds } = data;

  const updatedUser = await prisma.user.update({
    where: { id },
    data: {
      username,
      role: role as UserRole,
      events: {
        deleteMany: {},
        create: eventIds?.map((eventId: string) => ({
          event: {
            connect: {
              id: eventId,
            },
          },
        })),
      },
    },
    include: {
      events: {
        select: {
          eventId: true,
        },
      },
    },
  });

  const { password, ...userWithoutPassword } = updatedUser;
  return userWithoutPassword;
};

export const deleteUser = async (id: string) => {
  await prisma.user.delete({
    where: { id },
  });
};