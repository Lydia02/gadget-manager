import { prisma } from "../../fastify.js";

export async function createProduct({
  name,
  description,
  price,
  category,
  quantity,
}) {
  return prisma.product.create({
    data: {
      name,
      description,
      price,
      category,
      quantity,
    },
  });
}

export async function getAllProducts() {
  return prisma.product.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      category: true,
      quantity: true,
      discount: true,
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getProductById(id) {
  return prisma.product.findUnique({
    where: { id: Number(id) },
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      category: true,
      quantity: true,
      discount: true,
    },
  });
}

export async function editProduct({ id, name, description, price, category }) {
  return prisma.product.update({
    where: { id: Number(id) },
    data: { name, description, price, category },
  });
}

export async function deleteProduct(id) {
  return prisma.product.delete({
    where: { id: Number(id) },
  });
}

export async function updateProductQuantity(id, quantity) {
  return prisma.product.update({
    where: { id: Number(id) },
    data: { quantity },
  });
}

export async function updateProductPrice(id, price, discount = 0) {
  return prisma.product.update({
    where: { id: Number(id) },
    data: { price, discount },
  });
}
