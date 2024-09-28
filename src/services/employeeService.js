import { prisma } from "../../fastify.js";

export async function createEmployee({ firstName, lastName, email, role }) {
  return prisma.employee.create({
    data: { firstName, lastName, email, role },
  });
}

export async function editEmployee({ id, firstName, lastName, email, role }) {
  return prisma.employee.update({
    where: { id: Number(id) },
    data: { firstName, lastName, email, role },
  });
}

export async function deleteEmployee(id) {
  return prisma.employee.delete({
    where: { id: Number(id) },
  });
}

export async function getAllEmployees() {
  return prisma.employee.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function findEmployeeByEmail(email) {
  return prisma.employee.findUnique({
    where: { email },
  });
}

export async function getEmployeeById(id) {
  return prisma.employee.findUnique({
    where: { id: Number(id) },
  });
}
