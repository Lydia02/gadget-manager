import {
  makePurchaseController,
  getOrderHistoryController,
} from "../controllers/orderController.js";

export async function orderRoutes(fastify, options) {
  fastify.post(
    "/orders",
    { preValidation: [fastify.authenticate] },
    makePurchaseController
  );

  fastify.get(
    "/orders",
    { preValidation: [fastify.authenticate] },
    getOrderHistoryController
  );
}
