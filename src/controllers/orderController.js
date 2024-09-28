import { makePurchase, getOrderHistory } from "../services/orderService.js";
import { InternalServerError } from "../utils/errors.js";

export async function makePurchaseController(request, reply) {
  const { productId, quantity } = request.body;
  const userId = request.user.id;

  try {
    const order = await makePurchase({ productId, quantity, userId });
    return reply.code(201).send({ message: "Purchase successful", order });
  } catch (error) {
    request.log.error(error);
    throw new InternalServerError(
      "Error making purchase. Details: " + error.message
    );
  }
}

export async function getOrderHistoryController(request, reply) {
  const userId = request.user.id;

  try {
    const orders = await getOrderHistory(userId);
    return reply.send({ orders });
  } catch (error) {
    request.log.error(error);
    throw new InternalServerError(
      "Error fetching order history. Details: " + error.message
    );
  }
}
