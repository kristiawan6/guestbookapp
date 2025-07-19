import prisma from "@/lib/prisma";
import { generateQrCode } from "./qrService";
import * as XLSX from "xlsx";

interface GuestData {
  name: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
  numberOfGuests?: number;
  session?: string;
  tableNumber?: string;
  guestCategoryId?: string;
}

export const createGuest = async (eventId: string, data: GuestData) => {
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

  if (!name) {
    throw new Error("Missing required fields");
  }

  const guest = await prisma.guest.create({
    data: {
      name,
      email,
      phoneNumber,
      address,
      numberOfGuests: Number(numberOfGuests),
      session,
      tableNumber,
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

  const qrCode = await generateQrCode(guest.id);
  // In a real app, you'd likely store the QR code or a reference to it.
  // For now, we'll just return it.

  return { ...guest, qrCode };
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
    OR?: (
      | { name: { contains: string; mode: "insensitive" } }
      | { email: { contains: string; mode: "insensitive" } }
      | { phoneNumber: { contains: string; mode: "insensitive" } }
    )[];
  } = { eventId };
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
    }),
    prisma.guest.count({ where }),
  ]);

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

  await prisma.guest.createMany({
    data: guestsToCreate,
    skipDuplicates: true, // This is redundant now but kept for safety
  });

  return { message: "Guests imported successfully" };
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

  console.log(worksheet);

  const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
  return buffer;
};