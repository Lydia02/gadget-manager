import {
  getDailySalesReportController,
  getMonthlySalesReportController,
  getYearlySalesReportController,
  filterSalesByCategoryController,
  addSalesReportController,
} from "../controllers/salesReportController.js";

export async function salesReportRoutes(fastify, options) {
  fastify.get(
    "/admin/sales/daily",
    { preValidation: [fastify.authenticate] },
    getDailySalesReportController
  );

  fastify.get(
    "/admin/sales/monthly",
    { preValidation: [fastify.authenticate] },
    getMonthlySalesReportController
  );

  fastify.get(
    "/admin/sales/yearly",
    { preValidation: [fastify.authenticate] },
    getYearlySalesReportController
  );

  fastify.get(
    "/admin/sales/category",
    { preValidation: [fastify.authenticate] },
    filterSalesByCategoryController
  );

  fastify.post(
    "/admin/sales",
    { preValidation: [fastify.authenticate] },
    addSalesReportController
  );
}
