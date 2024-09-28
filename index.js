import "dotenv/config";
import { fastify, startServer, prisma } from "./fastify.js";
import jwtPlugin from "./src/config/jwt.js";

import authRoutes from "./src/routes/authRoutes.js";
import { employeeRoutes } from "./src/routes/employeeRoutes.js";
import { salesReportRoutes } from "./src/routes/salesReportRoutes.js";
import { productRoutes } from "./src/routes/productRoutes.js";
import { orderRoutes } from "./src/routes/orderRoutes.js";

fastify.register(jwtPlugin);

fastify.register(authRoutes);
fastify.register(employeeRoutes);
fastify.register(salesReportRoutes);
fastify.register(productRoutes);
fastify.register(orderRoutes);

fastify.get("/", async (request, reply) => {
  return { message: "Welcome to Gadget Store API" };
});

startServer();
