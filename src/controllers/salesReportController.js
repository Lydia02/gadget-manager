import {
  getDailySales,
  getMonthlySales,
  getYearlySales,
  filterSalesByCategory,
  addSalesReport,
} from "../services/salesReportService.js";
import { InternalServerError } from "../utils/errors.js";

export async function addSalesReportController(request, reply) {
  const { productId, quantity, totalAmount, saleDate } = request.body;

  try {
    const report = await addSalesReport({
      productId,
      quantity,
      totalAmount,
      saleDate,
    });
    return reply
      .code(201)
      .send({ message: "Sales report added successfully", report });
  } catch (error) {
    if (error.message.includes("Product with ID")) {
      return reply.code(400).send({
        error: {
          message: error.message,
          statusCode: 400,
        },
      });
    }

    request.log.error(error);
    throw new InternalServerError(
      "Error adding sales report. Details: " + error.message
    );
  }
}

export async function getDailySalesReportController(request, reply) {
  try {
    const report = await getDailySales();
    return reply.send({ report });
  } catch (error) {
    request.log.error(error);
    throw new InternalServerError(
      "Error fetching daily sales report. Details: " + error.message
    );
  }
}

export async function getMonthlySalesReportController(request, reply) {
  try {
    const report = await getMonthlySales();
    return reply.send({ report });
  } catch (error) {
    request.log.error(error);
    throw new InternalServerError(
      "Error fetching monthly sales report. Details: " + error.message
    );
  }
}

export async function getYearlySalesReportController(request, reply) {
  try {
    const report = await getYearlySales();
    return reply.send({ report });
  } catch (error) {
    request.log.error(error);
    throw new InternalServerError(
      "Error fetching yearly sales report. Details: " + error.message
    );
  }
}

export async function filterSalesByCategoryController(request, reply) {
  const { category } = request.query;

  try {
    const report = await filterSalesByCategory(category);
    return reply.send({ report });
  } catch (error) {
    request.log.error(error);
    throw new InternalServerError(
      "Error fetching sales report by category. Details: " + error.message
    );
  }
}
