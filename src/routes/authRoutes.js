import { register, login, logout } from "../controllers/authController.js";

export async function authRoutes(fastify, options) {
  fastify.post("/register", {
    schema: {
      body: {
        type: "object",
        required: ["firstName", "lastName", "email", "password"],
        properties: {
          firstName: { type: "string" },
          lastName: { type: "string" },
          email: { type: "string" },
          password: { type: "string" },
          role: { type: "string" },
        },
      },
    },
    handler: register,
  });

  fastify.post("/login", {
    schema: {
      body: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: { type: "string" },
          password: { type: "string" },
        },
      },
    },
    handler: login,
  });

  fastify.post("/logout", {
    preValidation: [fastify.authenticate],
    handler: logout,
  });
}

export default authRoutes;
