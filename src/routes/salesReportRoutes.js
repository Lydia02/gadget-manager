import {
  getDailySalesReportController,
  addSalesReportController,
} from "../controllers/salesReportController.js";

export async function salesReportRoutes(fastify, options) {
  fastify.get(
    "/admin/sales/daily",
    { preValidation: [fastify.authenticate] },
    getDailySalesReportController
  );

  fastify.post(
    "/admin/sales",
    { preValidation: [fastify.authenticate] },
    addSalesReportController
  );
}
