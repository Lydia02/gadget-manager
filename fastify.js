import Fastify from "fastify";
import { PrismaClient } from "@prisma/client";
const fastify = Fastify({ logger: true });
const prisma = new PrismaClient();

fastify.setErrorHandler((error, request, reply) => {
  request.log.error(error);

  const statusCode = error.statusCode || 500;
  reply.status(statusCode).send({
    error: {
      message: error.message || "Internal Server Error",
      statusCode,
    },
  });
});

fastify.addHook("onClose", async (instance, done) => {
  await prisma.$disconnect();
  done();
});

export const startServer = async () => {
  try {
    await fastify.listen({ port: process.env.PORT || 3000 });
    fastify.log.info(
      `Server running at http://localhost:${process.env.PORT || 3000}/`
    );
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

export { fastify, prisma };
