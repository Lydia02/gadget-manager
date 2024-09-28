import { prisma } from "../../fastify.js";

export async function addSalesReport({
  productId,
  quantity,
  totalAmount,
  saleDate,
}) {
  const productExists = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!productExists) {
    throw new Error(`Product with ID ${productId} does not exist.`);
  }

  return prisma.salesReport.create({
    data: {
      productId,
      quantity,
      totalAmount,
      saleDate: new Date(saleDate),
    },
  });
}

export async function getDailySales() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return prisma.salesReport.findMany({
    where: {
      saleDate: {
        gte: today,
        lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
      },
    },
  });
}

export async function getMonthlySales() {
  const firstDayOfMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1
  );

  return prisma.salesReport.findMany({
    where: {
      saleDate: {
        gte: firstDayOfMonth,
        lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1),
      },
    },
  });
}

export async function getYearlySales() {
  const firstDayOfYear = new Date(new Date().getFullYear(), 0, 1);

  return prisma.salesReport.findMany({
    where: {
      saleDate: {
        gte: firstDayOfYear,
        lt: new Date(new Date().getFullYear() + 1, 0, 1),
      },
    },
  });
}

export async function filterSalesByCategory(category) {
  return prisma.salesReport.findMany({
    where: {
      product: {
        category: category,
      },
    },
    include: {
      product: true,
    },
  });
}
