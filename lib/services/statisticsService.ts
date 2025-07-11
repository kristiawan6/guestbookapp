import prisma from "@/lib/prisma";

export const getGuestStatistics = async (eventId: string) => {
  const totalGuests = await prisma.guest.count({
    where: { eventId },
  });

  const totalEvents = await prisma.event.count();
  const totalGuestsLastEvent = await prisma.guest.count({
    where: {
      event: {
        id: eventId,
      },
    },
  });
  const deletedGuests = await prisma.guest.count({
    where: {
      id: {
        in: [],
      },
    },
  });

  const totalMessages = await prisma.message.count({
    where: { eventId },
  });

  const newMessages = await prisma.message.count({
    where: {
      eventId,
      timestamp: {
        gte: new Date(new Date().setDate(new Date().getDate() - 1)),
      },
    },
  });

  const claimedSouvenirs = await prisma.claimTransaction.count({
    where: {
      claimableItem: {
        eventId,
      },
    },
  });

  return {
    totalGuests,
    totalEvents,
    totalGuestsLastEvent,
    deletedGuests,
    totalMessages,
    newMessages,
    claimedSouvenirs,
  };
};