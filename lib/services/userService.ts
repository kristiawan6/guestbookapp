import prisma from "@/lib/prisma";
import { hash } from "bcrypt";
import { UserRole } from "@/app/generated/prisma";


interface UserData {
  username: string;
  password?: string;
  role: UserRole;
  eventIds?: string[];
}

export const createUser = async (data: UserData) => {
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
  const { ...userWithoutPassword } = user;
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

export const updateUser = async (id: string, data: Partial<UserData>) => {
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

  const { ...userWithoutPassword } = updatedUser;
  return userWithoutPassword;
};

export const deleteUser = async (id: string) => {
  await prisma.user.delete({
    where: { id },
  });
};