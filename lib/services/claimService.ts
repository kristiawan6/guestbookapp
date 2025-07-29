import prisma from "@/lib/prisma";

interface ClaimableItemData {
  name: string;
  description?: string;
  totalQuantity: number;
}

export const createClaimableItem = async (
  eventId: string,
  data: ClaimableItemData
) => {
  const { name, description, totalQuantity } = data;

  if (!name || !totalQuantity) {
    throw new Error("Missing required fields");
  }

  const claimableItem = await prisma.claimableItem.create({
    data: {
      name,
      description,
      totalQuantity,
      remainingQuantity: totalQuantity,
      event: {
        connect: {
          id: eventId,
        },
      },
    },
  });

  return claimableItem;
};

export const getClaimableItems = async (
  eventId: string,
  search?: string,
  page: number = 1,
  limit: number = 10,
  sortKey: string = "name",
  sortOrder: string = "asc"
) => {
  const where: {
    eventId: string;
    OR?: (
      | { name: { contains: string; mode: "insensitive" } }
      | { description: { contains: string; mode: "insensitive" } }
    )[];
  } = { eventId };
  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
    ];
  }

  const [claimableItems, total] = await prisma.$transaction([
    prisma.claimableItem.findMany({
      where,
      orderBy: {
        [sortKey]: sortOrder,
      },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.claimableItem.count({ where }),
  ]);

  return {
    data: claimableItems,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getClaimableItem = async (id: string, eventId?: string) => {
  const where: { id: string; eventId?: string } = { id };
  if (eventId) {
    where.eventId = eventId;
  }
  
  const item = await prisma.claimableItem.findFirst({
    where,
  });
  return item;
};

export const updateClaimableItem = async (
  id: string,
  data: Partial<ClaimableItemData> & { quantity?: number }
) => {
  const { name, description, quantity } = data;

  const updatedClaimableItem = await prisma.claimableItem.update({
    where: { id },
    data: {
      name,
      description,
      totalQuantity: quantity,
    },
  });

  return updatedClaimableItem;
};

export const deleteClaimableItem = async (id: string) => {
  await prisma.claimableItem.delete({
    where: { id },
  });
};

export const recordClaimTransaction = async (
  itemId: string,
  guestId: string,
  adminId: string
) => {
  const transaction = await prisma.$transaction(async (tx) => {
    const existingTransaction = await tx.claimTransaction.findFirst({
      where: {
        guestId,
        claimableItemId: itemId,
      },
      include: {
        guest: true,
      },
    });

    if (existingTransaction) {
      return {
        ...existingTransaction,
        isExisting: true,
        message: "Guest has already claimed this item",
      };
    }

    const item = await tx.claimableItem.findUnique({
      where: { id: itemId },
    });

    if (!item || item.remainingQuantity <= 0) {
      throw new Error("No items left to claim");
    }

    await tx.claimableItem.update({
      where: { id: itemId },
      data: {
        remainingQuantity: {
          decrement: 1,
        },
      },
    });

    const newTransaction = await tx.claimTransaction.create({
      data: {
        guest: {
          connect: {
            id: guestId,
          },
        },
        claimableItem: {
          connect: {
            id: itemId,
          },
        },
        admin: {
          connect: {
            id: adminId,
          },
        },
      },
      include: {
        guest: true,
      },
    });

    return {
      ...newTransaction,
      isExisting: false,
      message: "Claim recorded successfully",
    };
  });

  return transaction;
};

export const getClaimTransactions = async (itemId: string) => {
  const transactions = await prisma.claimTransaction.findMany({
    where: { claimableItemId: itemId },
    include: {
      guest: true,
    },
  });
  return transactions;
};