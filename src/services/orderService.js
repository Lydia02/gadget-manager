import { prisma } from "../../fastify.js";

export async function makePurchase({ productId, quantity, userId }) {
  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product || product.quantity < quantity) {
    throw new Error("Product not available in the requested quantity.");
  }

  const order = await prisma.order.create({
    data: {
      userId,
      total: product.price * quantity,
      items: {
        create: [
          {
            productId,
            quantity,
          },
        ],
      },
    },
    include: {
      items: {
        include: {
          product: {
            select: {
              name: true,
              specifications: {
                select: {
                  name: true,
                  value: true,
                },
              },
            },
          },
        },
      },
    },
  });

  await prisma.product.update({
    where: { id: productId },
    data: { quantity: product.quantity - quantity },
  });

  return order;
}

export async function getOrderHistory(userId) {
  return prisma.order.findMany({
    where: { userId },
    include: {
      items: {
        include: {
          product: {
            select: {
              name: true,
              specifications: {
                select: {
                  name: true,
                  value: true,
                },
              },
            },
          },
        },
      },
    },
  });
}
