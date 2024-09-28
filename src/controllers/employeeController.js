import {
  createEmployee,
  editEmployee,
  deleteEmployee,
  getAllEmployees,
  findEmployeeByEmail,
  getEmployeeById,
} from "../services/employeeService.js";
import { InternalServerError, NotFoundError } from "../utils/errors.js";

export async function createEmployeeController(request, reply) {
  const { firstName, lastName, email, role } = request.body;

  try {
    l;
    const existingEmployee = await findEmployeeByEmail(email);

    if (existingEmployee) {
      return reply.code(400).send({ error: "Employee already exists" });
    }

    const employee = await createEmployee({ firstName, lastName, email, role });
    return reply
      .code(201)
      .send({ message: "Employee created successfully", employee });
  } catch (error) {
    request.log.error(error);
    throw new InternalServerError(
      "Error creating employee. Details: " + error.message
    );
  }
}

export async function editEmployeeController(request, reply) {
  const { id, firstName, lastName, email, role } = request.body;

  try {
    const employee = await editEmployee({
      id,
      firstName,
      lastName,
      email,
      role,
    });
    return reply.send({ message: "Employee updated successfully", employee });
  } catch (error) {
    request.log.error(error);
    throw new InternalServerError(
      "Error updating employee. Details: " + error.message
    );
  }
}

export async function deleteEmployeeController(request, reply) {
  const { id } = request.params;

  try {
    await deleteEmployee(id);
    return reply.send({ message: "Employee deleted successfully" });
  } catch (error) {
    request.log.error(error);
    throw new InternalServerError(
      "Error deleting employee. Details: " + error.message
    );
  }
}

export async function getAllEmployeesController(request, reply) {
  try {
    const employees = await getAllEmployees();
    return reply.send({ employees });
  } catch (error) {
    request.log.error(error);
    throw new InternalServerError(
      "Error fetching employees. Details: " + error.message
    );
  }
}

export async function getEmployeeByIdController(request, reply) {
  const { id } = request.params;

  try {
    const employee = await getEmployeeById(id);

    if (!employee) {
      throw new NotFoundError(`Employee with ID ${id} not found`);
    }

    return reply.send({ employee });
  } catch (error) {
    request.log.error(error);
    throw new InternalServerError(
      "Error fetching employee. Details: " + error.message
    );
  }
}
