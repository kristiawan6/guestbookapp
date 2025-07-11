import prisma from "@/lib/prisma";
import { generateQrCode } from "./qrService";
import * as XLSX from "xlsx";

export const createGuest = async (eventId: string, data: any) => {
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
  limit: number = 10
) => {
  const where: any = { eventId };
  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
      { phoneNumber: { contains: search, mode: "insensitive" } },
    ];
  }

  const guests = await prisma.guest.findMany({
    where,
    skip: (page - 1) * limit,
    take: limit,
  });

  const total = await prisma.guest.count({ where });

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

export const updateGuest = async (id: string, data: any) => {
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
  const data: any[] = XLSX.utils.sheet_to_json(worksheet);

  for (const row of data) {
    const existingGuest = await prisma.guest.findFirst({
      where: {
        name: row.Fullname,
        eventId,
      },
    });

    if (existingGuest) {
      throw new Error(`Guest "${row.Fullname}" already exists.`);
    }
  }

  const guestsToCreate = await Promise.all(
    data.map(async (row: any) => {
      let guestCategoryId;
      if (row.Category) {
        const category = await prisma.guestCategory.findFirst({
          where: {
            name: row.Category,
            eventId,
          },
        });
        if (category) {
          guestCategoryId = category.id;
        } else {
          // Optionally create the category if it doesn't exist
          const newCategory = await prisma.guestCategory.create({
            data: {
              name: row.Category,
              eventId,
              code: Math.random().toString(36).substring(2, 8).toUpperCase(),
            },
          });
          guestCategoryId = newCategory.id;
        }
      }

      return {
        name: row.Fullname,
        email: row.email,
        phoneNumber: String(row.Telephone),
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