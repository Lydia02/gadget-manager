import bcrypt from "bcrypt";
import { prisma } from "../../fastify.js";
import { BadRequestError, UnauthorizedError } from "../utils/errors.js";

export async function registerUser(firstName, lastName, email, password, role) {
  const userExists = await prisma.user.findUnique({
    where: { email },
  });

  if (userExists) {
    throw new BadRequestError("User already exists");
  }

  const userRole = role === "admin" ? "admin" : "user";

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      password: passwordHash,
      role: userRole,
    },
  });

  return user;
}

export async function loginUser(email, password) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new UnauthorizedError("Invalid credentials");
  }

  return user;
}
const blacklist = new Set();

export function blacklistToken(token) {
  blacklist.add(token);
}

export function isTokenBlacklisted(token) {
  return blacklist.has(token);
}
