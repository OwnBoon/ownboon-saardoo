import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ log: ["info"] });

export default prisma;

// export const db = globalThis.prisma || new PrismaClient();
// if (process.env.NODE_ENV !== "production") globalThis.prisma = db

// import { Prisma, PrismaClient } from "@prisma/client";

// declare global {
//   namespace NodeJS {
//     interface Global {
//       prisma: PrismaClient;
//     }
//   }
// }

// let prisma: PrismaClient;

// if (typeof window === "undefined") {
//   if (process.env.NODE_ENV === "production") {
//     prisma = new PrismaClient();
//   } else {
//     //@ts-ignore
//     if (!global.prisma) {
//       //@ts-ignore
//       global.prisma = new PrismaClient();
//     }
//     //@ts-ignore
//     prisma = global.prisma;
//   }
// }
// //@ts-ignore
// export default prisma;
