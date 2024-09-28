import "dotenv/config";
import { fastify, startServer, prisma } from "./fastify.js";
import jwtPlugin from "./src/config/jwt.js";

import authRoutes from "./src/routes/authRoutes.js";
// import { adminRoutes } from "./src/routes/adminRoutes.js";
// import { productRoutes } from "./src/routes/productRoutes.js";
// import profileRoutes from "./src/routes/profileRoutes.js";

fastify.register(jwtPlugin);

fastify.register(authRoutes);
// fastify.register(adminRoutes);
// fastify.register(productRoutes);
// fastify.register(profileRoutes);

fastify.get("/", async (request, reply) => {
  return { message: "Welcome to Gadget Store API" };
});

startServer();
