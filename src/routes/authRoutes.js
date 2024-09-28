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
        },
      },
    },
    handler: (request, reply) => register(request, reply, "user"), // Pass "user" role
  });

  fastify.post("/admin/register", {
    schema: {
      body: {
        type: "object",
        required: ["firstName", "lastName", "email", "password"],
        properties: {
          firstName: { type: "string" },
          lastName: { type: "string" },
          email: { type: "string" },
          password: { type: "string" },
        },
      },
    },
    handler: (request, reply) => register(request, reply, "admin"),
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
