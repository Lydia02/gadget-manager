import {
  createEmployeeController,
  editEmployeeController,
  deleteEmployeeController,
  getAllEmployeesController,
  getEmployeeByIdController,
} from "../controllers/employeeController.js";

export async function employeeRoutes(fastify, options) {
  fastify.get(
    "/admin/employees",
    { preValidation: [fastify.authenticate] },
    getAllEmployeesController
  );

  fastify.get(
    "/admin/employees/:id",
    { preValidation: [fastify.authenticate] },
    getEmployeeByIdController
  );

  fastify.post(
    "/admin/employees",
    { preValidation: [fastify.authenticate] },
    createEmployeeController
  );

  fastify.put(
    "/admin/employees",
    { preValidation: [fastify.authenticate] },
    editEmployeeController
  );

  fastify.delete(
    "/admin/employees/:id",
    { preValidation: [fastify.authenticate] },
    deleteEmployeeController
  );
}
