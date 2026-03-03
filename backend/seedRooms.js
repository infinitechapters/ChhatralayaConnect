import prisma from "./prismaClient.js";

async function seedRooms() {

  const rooms = [];

  // 101–122
  for (let i = 101; i <= 122; i++) {
    rooms.push({
      roomNumber: String(i),
      hostelNo: "1 (Ground Floor)",
      capacity: 2,
    });
  }

  // 201–228
  for (let i = 201; i <= 228; i++) {
    rooms.push({
      roomNumber: String(i),
      hostelNo: "1 (First Floor)",
      capacity: 2,
    });
  }

  for (const room of rooms) {
    await prisma.room.create({ data: room });
  }

  console.log("Rooms seeded successfully!");
  process.exit(0);
}

seedRooms();