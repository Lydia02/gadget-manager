import fastifyPlugin from "fastify-plugin";
import { UnauthorizedError } from "../utils/errors.js";
import fastifyJwt from "@fastify/jwt";
import { isTokenBlacklisted } from "../services/authService.js";
async function jwtPlugin(fastify, options) {
  fastify.register(fastifyJwt, {
    secret: process.env.JWT_SECRET,
    sign: {
      expiresIn: "1h",
    },
  });

  fastify.decorate("authenticate", async function (request, reply) {
    try {
      const token = request.headers.authorization.split(" ")[1];

      if (isTokenBlacklisted(token)) {
        throw new UnauthorizedError("Token has been invalidated");
      }

      await request.jwtVerify();
    } catch (error) {
      request.log.error(error);

      if (error.name === "TokenExpiredError") {
        throw new UnauthorizedError("Token has expired");
      } else if (error.name === "JsonWebTokenError") {
        throw new UnauthorizedError("Invalid token");
      } else {
        throw new UnauthorizedError("Unauthorized");
      }
    }
  });
}

export default fastifyPlugin(jwtPlugin);
