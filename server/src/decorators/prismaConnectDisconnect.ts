import { prisma } from '../lib/prisma';

export const PrismaConnectDisconnect = (
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) => {
  const originalMethod = descriptor.value;

  descriptor.value = async function (...args: any[]) {
    try {
      // Connect the Prisma client
      await prisma.$connect();

      // Call the original method with the Prisma client and arguments
      const result = await originalMethod.apply(this, [...args]);

      return result;
    } finally {
      // Disconnect the Prisma client
      await prisma.$disconnect();
    }
  };

  return descriptor;
};
