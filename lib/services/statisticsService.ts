import prisma from "@/lib/prisma";

export const getGuestStatistics = async (eventId: string) => {
  const totalGuests = await prisma.guest.count({
    where: { eventId },
  });

  const activeGuests = await prisma.guest.count({
    where: { 
      eventId,
      isDeleted: false,
    },
  });

  const deletedGuests = await prisma.guest.count({
    where: { 
      eventId,
      isDeleted: true,
    },
  });

  const totalEvents = await prisma.event.count();
  const totalGuestsLastEvent = await prisma.guest.count({
    where: {
      event: {
        id: eventId,
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

  // Calculate attendance statistics
  const attendedGuests = await prisma.guest.count({
    where: {
      eventId,
      isDeleted: false,
      status: 'Attended',
    },
  });

  const notAttendedGuests = activeGuests - attendedGuests;
  const attendanceRate = activeGuests > 0 ? Math.round((attendedGuests / activeGuests) * 100) : 0;

  // Calculate RSVP rate (using attendance as proxy)
  const rsvpRate = totalGuests > 0 ? Math.round((attendedGuests / totalGuests) * 100) : 0;

  // Get guest categories distribution
  const guestCategories = await prisma.guestCategory.findMany({
    where: { eventId },
    include: {
      _count: {
        select: {
          guests: {
            where: {
              isDeleted: false,
            },
          },
        },
      },
    },
  });

  const categoryDistribution = guestCategories.map((category, index) => ({
    name: category.name,
    value: category._count.guests,
    color: ['#8B5CF6', '#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5A2B'][index % 6],
  }));

  // Get monthly trends (last 6 months)
  const monthlyTrends = [];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentDate = new Date();
  
  for (let i = 5; i >= 0; i--) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
    const nextDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - i + 1, 1);
    
    const monthGuests = await prisma.guest.count({
      where: {
        eventId,
        createdAt: {
          gte: date,
          lt: nextDate,
        },
      },
    });
    
    const monthActiveGuests = await prisma.guest.count({
      where: {
        eventId,
        isDeleted: false,
        createdAt: {
          gte: date,
          lt: nextDate,
        },
      },
    });
    
    const monthAttendedGuests = await prisma.guest.count({
      where: {
        eventId,
        isDeleted: false,
        status: 'Attended',
        createdAt: {
          gte: date,
          lt: nextDate,
        },
      },
    });
    
    monthlyTrends.push({
      month: months[date.getMonth()],
      guests: monthGuests,
      active: monthActiveGuests,
      attended: monthAttendedGuests,
    });
  }

  // Attendance distribution for pie chart
  const attendanceDistribution = [
    { name: 'Present', value: attendedGuests, color: '#10B981' },
    { name: 'Absent', value: notAttendedGuests, color: '#EF4444' },
    { name: 'Virtual', value: 0, color: '#3B82F6' }, // Placeholder for virtual attendance
  ];

  // RSVP Status distribution (using actual GuestStatus enum values)
  const attendedGuestsRSVP = await prisma.guest.count({
    where: {
      eventId,
      isDeleted: false,
      status: 'Attended',
    },
  });

  const cancelledGuests = await prisma.guest.count({
    where: {
      eventId,
      isDeleted: false,
      status: 'Cancelled',
    },
  });

  const invitedGuests = await prisma.guest.count({
    where: {
      eventId,
      isDeleted: false,
      status: 'Invited',
    },
  });

  const rsvpDistribution = [
    { name: 'Confirmed', value: attendedGuestsRSVP, color: '#10B981' },
    { name: 'Declined', value: cancelledGuests, color: '#EF4444' },
    { name: 'Virtual Only', value: 0, color: '#8B5CF6' }, // Not available in current schema
    { name: 'No Response', value: invitedGuests, color: '#9CA3AF' },
  ];

  // WhatsApp Status distribution
  const whatsappSent = await prisma.guest.count({
    where: {
      eventId,
      isDeleted: false,
      whatsappStatus: 'Sent',
    },
  });

  const whatsappDelivered = await prisma.guest.count({
    where: {
      eventId,
      isDeleted: false,
      whatsappStatus: 'Delivered',
    },
  });

  const whatsappRead = await prisma.guest.count({
    where: {
      eventId,
      isDeleted: false,
      whatsappStatus: 'Read',
    },
  });

  const whatsappNotSent = await prisma.guest.count({
    where: {
      eventId,
      isDeleted: false,
      whatsappStatus: 'NotSent',
    },
  });

  const whatsappFailed = await prisma.guest.count({
    where: {
      eventId,
      isDeleted: false,
      whatsappStatus: 'Failed',
    },
  });

  const whatsappDistribution = [
    { name: 'Read', value: whatsappRead, color: '#10B981' },
    { name: 'Delivered', value: whatsappDelivered, color: '#3B82F6' },
    { name: 'Sent', value: whatsappSent, color: '#F59E0B' },
    { name: 'Not Sent', value: whatsappNotSent, color: '#9CA3AF' },
    { name: 'Failed', value: whatsappFailed, color: '#EF4444' },
  ].filter(item => item.value > 0); // Only show statuses with data

  // Email Status distribution
  const emailSent = await prisma.guest.count({
    where: {
      eventId,
      isDeleted: false,
      emailStatus: 'Sent',
    },
  });

  const emailDelivered = await prisma.guest.count({
    where: {
      eventId,
      isDeleted: false,
      emailStatus: 'Delivered',
    },
  });

  const emailRead = await prisma.guest.count({
    where: {
      eventId,
      isDeleted: false,
      emailStatus: 'Read',
    },
  });

  const emailNotSent = await prisma.guest.count({
    where: {
      eventId,
      isDeleted: false,
      emailStatus: 'NotSent',
    },
  });

  const emailFailed = await prisma.guest.count({
    where: {
      eventId,
      isDeleted: false,
      emailStatus: 'Failed',
    },
  });

  const emailDistribution = [
    { name: 'Read', value: emailRead, color: '#10B981' },
    { name: 'Delivered', value: emailDelivered, color: '#3B82F6' },
    { name: 'Sent', value: emailSent, color: '#F59E0B' },
    { name: 'Not Sent', value: emailNotSent, color: '#9CA3AF' },
    { name: 'Failed', value: emailFailed, color: '#EF4444' },
  ].filter(item => item.value > 0); // Only show statuses with data

  return {
    totalGuests,
    activeGuests,
    deletedGuests,
    attendedGuests,
    notAttendedGuests,
    attendanceRate,
    totalEvents,
    totalGuestsLastEvent,
    totalMessages,
    newMessages,
    claimedSouvenirs,
    rsvpRate,
    categoryDistribution,
    monthlyTrends,
    attendanceDistribution,
    rsvpDistribution,
    whatsappDistribution,
    emailDistribution,
  };
};