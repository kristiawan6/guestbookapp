import prisma from "@/lib/prisma";
import { generateQrCode } from "./qrService";
import * as XLSX from "xlsx";
import { WhatsAppStatus } from "@prisma/client";

interface GuestData {
  name: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
  numberOfGuests?: number;
  session?: string;
  tableNumber?: string;
  guestCategoryId?: string;
  notes?: string;
  whatsappStatus?: WhatsAppStatus;
  dateArrival?: Date;
  createdBy?: string;
}

export const createGuest = async (eventId: string, data: GuestData, userId?: string) => {
  const {
    name,
    email,
    phoneNumber,
    address,
    numberOfGuests,
    session,
    tableNumber,
    guestCategoryId,
    notes,
    whatsappStatus,
    dateArrival,
    createdBy,
  } = data;

  // Validate required fields
  if (!name || !email || !phoneNumber || !guestCategoryId) {
    throw new Error("Missing required fields: Fullname, Email Address, Phone Number, and Guest Category are required");
  }

  // Check for duplicate phone number in this event
  if (phoneNumber) {
    const existingGuestByPhone = await prisma.guest.findFirst({
      where: {
        phoneNumber,
        eventId,
        isDeleted: false
      }
    });
    
    if (existingGuestByPhone) {
      throw new Error(`A guest with phone number ${phoneNumber} already exists for this event`);
    }
  }

  // Check for duplicate email in this event
  if (email) {
    const existingGuestByEmail = await prisma.guest.findFirst({
      where: {
        email,
        eventId,
        isDeleted: false
      }
    });
    
    if (existingGuestByEmail) {
      throw new Error(`A guest with email ${email} already exists for this event`);
    }
  }

  // Check if guest category exists and has quota
  if (guestCategoryId) {
    const category = await prisma.guestCategory.findUnique({
      where: { id: guestCategoryId },
      include: { _count: { select: { guests: true } } }
    });
    
    if (!category) {
      throw new Error("Invalid guest category");
    }
    
    if (category.quota && category._count.guests >= category.quota) {
      throw new Error(`Category "${category.name}" has reached its maximum quota of ${category.quota} guests`);
    }
  }

  const guest = await prisma.guest.create({
    data: {
      name,
      email,
      phoneNumber,
      address,
      numberOfGuests: numberOfGuests || 1, // Default to 1 if not provided
      session,
      tableNumber,
      notes,
      status: 'Invited', 
      whatsappStatus: whatsappStatus || WhatsAppStatus.NotSent, // Default: "Not Sent"
      // Note: createdBy, signed, emailStatus, webStatus, and dateArrival have database defaults and will be set automatically
      event: {
        connect: {
          id: eventId,
        },
      },
      guestCategory: guestCategoryId
        ? {
            connect: {
              id: guestCategoryId,
            },
          }
        : undefined,
    },
  });

  // Auto-generate QR code for every new guest
  const qrCode = await generateQrCode(guest.id);
  
  // Update the guest with the generated QR code
  const updatedGuest = await prisma.guest.update({
    where: { id: guest.id },
    data: { qrCode },
  });

  return updatedGuest;
};

export const getGuests = async (
  eventId: string,
  search?: string,
  page: number = 1,
  limit: number = 10,
  sortKey: string = "name",
  sortOrder: string = "asc"
) => {
  const where: {
    eventId: string;
    isDeleted: boolean;
    OR?: (
      | { name: { contains: string; mode: "insensitive" } }
      | { email: { contains: string; mode: "insensitive" } }
      | { phoneNumber: { contains: string; mode: "insensitive" } }
    )[];
  } = { eventId, isDeleted: false };
  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
      { phoneNumber: { contains: search, mode: "insensitive" } },
    ];
  }

  const [guests, total] = await prisma.$transaction([
    prisma.guest.findMany({
      where,
      orderBy: {
        [sortKey]: sortOrder,
      },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        guestCategory: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
        event: {
          select: {
            id: true,
            name: true,
          },
        }
      },
    }),
    prisma.guest.count({ where }),
  ]);

  // TODO: Add user enrichment once Prisma client is properly regenerated

  return {
    data: guests,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getAllGuests = async (eventId: string) => {
  const guests = await prisma.guest.findMany({
    where: { eventId },
    include: {
      guestCategory: {
        select: {
          id: true,
          name: true,
          code: true,
        },
      },
    },
    orderBy: {
      name: 'asc',
    },
  });
  return guests;
};

export const getGuestById = async (id: string) => {
  const guest = await prisma.guest.findUnique({
    where: { id },
    include: {
      event: {
        select: {
          id: true,
          name: true,
          description: true,
        },
      },
      guestCategory: {
        select: {
          id: true,
          name: true,
          code: true,
          description: true,
        },
      },
      messages: {
        select: {
          id: true,
          content: true,
          timestamp: true,
          approved: true,
        },
        orderBy: {
          timestamp: 'desc',
        },
      },
    },
  });
  
  if (!guest) {
    throw new Error("Guest not found");
  }
  
  return guest;
};

export const updateGuest = async (id: string, data: Partial<GuestData>) => {
  const {
    name,
    email,
    phoneNumber,
    address,
    numberOfGuests,
    session,
    tableNumber,
    guestCategoryId,
  } = data;

  const updatedGuest = await prisma.guest.update({
    where: { id },
    data: {
      name,
      email,
      phoneNumber,
      address,
      numberOfGuests: Number(numberOfGuests),
      session,
      tableNumber,
      guestCategoryId,
    },
  });

  return updatedGuest;
};

export const deleteGuest = async (id: string) => {
  await prisma.guest.delete({
    where: { id },
  });
};

export const importGuests = async (eventId: string, file: Buffer) => {
  const workbook = XLSX.read(file, { type: "buffer" });
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const data: GuestData[] = XLSX.utils.sheet_to_json(worksheet);

  const existingGuests = await prisma.guest.findMany({
    where: {
      eventId,
      name: { in: data.map((row) => row.name) },
    },
    select: {
      name: true,
    },
  });
  const existingGuestNames = new Set(existingGuests.map((guest) => guest.name));

  for (const row of data) {
    if (existingGuestNames.has(row.name)) {
      throw new Error(`Guest "${row.name}" already exists.`);
    }
  }

  const guestsToCreate = await Promise.all(
    data.map(async (row) => {
      let guestCategoryId;
      if (row.guestCategoryId) {
        const category = await prisma.guestCategory.findFirst({
          where: {
            id: row.guestCategoryId,
            eventId,
          },
        });
        if (category) {
          guestCategoryId = category.id;
        }
      }

      return {
        name: row.name,
        email: row.email,
        phoneNumber: String(row.phoneNumber),
        address: row.address,
        eventId,
        guestCategoryId,
      };
    })
  );

  // Create guests individually to generate QR codes for each
  const createdGuests = [];
  for (const guestData of guestsToCreate) {
    const guest = await prisma.guest.create({
      data: guestData,
    });
    
    // Generate and save QR code for each guest
    const qrCode = await generateQrCode(guest.id);
    const updatedGuest = await prisma.guest.update({
      where: { id: guest.id },
      data: { qrCode },
    });
    
    createdGuests.push(updatedGuest);
  }

  return { 
    message: "Guests imported successfully", 
    count: createdGuests.length,
    guests: createdGuests 
  };
};

export const exportGuests = async (eventId: string) => {
  const guests = await prisma.guest.findMany({
    where: { eventId },
    include: {
      guestCategory: true,
    },
  });

  const dataToExport = guests.map((guest) => ({
    Fullname: guest.name,
    Category: guest.guestCategory?.name || "N/A",
    Telephone: guest.phoneNumber,
    email: guest.email,
    address: guest.address,
  }));

  const worksheet = XLSX.utils.json_to_sheet(dataToExport);

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Guests");

  // Define header style
  const headerStyle = {
    font: {
      bold: true,
      sz: 15,
    },
    border: {
      top: { style: "thin" },
      bottom: { style: "thin" },
      left: { style: "thin" },
      right: { style: "thin" },
    },
  };

  // Apply style to header cells
  const range = XLSX.utils.decode_range(worksheet["!ref"]!);
  for (let C = range.s.c; C <= range.e.c; ++C) {
    const address = XLSX.utils.encode_cell({ r: range.s.r, c: C });
    if (!worksheet[address]) continue;
    worksheet[address].s = headerStyle;
  }


  const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
  return buffer;
};