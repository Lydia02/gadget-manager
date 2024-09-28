import {
  registerUser,
  loginUser,
  blacklistToken,
} from "../services/authService.js";
import { userSchema } from "../models/userSchema.js";
import { InternalServerError } from "../utils/errors.js";

export async function register(request, reply) {
  const { firstName, lastName, email, password, role } = request.body;

  try {
    const parsedData = userSchema.parse({
      firstName,
      lastName,
      email,
      password,
    });

    const user = await registerUser(
      parsedData.firstName,
      parsedData.lastName,
      parsedData.email,
      parsedData.password,
      role
    );

    const token = await reply.jwtSign({ id: user.id, role: user.role });

    return reply.code(201).send({
      message: "Registration successful, Kindly login",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply.status(400).send({ error: error.errors });
    }

    request.log.error(error);
    return reply.status(error.statusCode || 500).send({
      error: {
        message: error.message || "Internal Server Error",
        statusCode: error.statusCode || 500,
      },
    });
  }
}

export async function login(request, reply) {
  const { email, password } = request.body;

  try {
    const user = await loginUser(email, password);
    const token = await reply.jwtSign({ id: user.id, role: user.role });

    return reply.send({
      message: "Login successful below are your details",
      user,
      token,
    });
  } catch (error) {
    request.log.error(error);
    throw new InternalServerError("Failed to log in");
  }
}

export async function logout(request, reply) {
  const token = request.headers.authorization.split(" ")[1];
  blacklistToken(token);

  return reply.code(200).send({
    message: "Logout successful",
  });
}
