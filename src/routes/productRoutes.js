import {
  createProductController,
  editProductController,
  deleteProductController,
  updateProductQuantityController,
  updateProductPriceController,
  getAllProductsController,
  getProductByIdController,
} from "../controllers/productController.js";

export async function productRoutes(fastify, options) {
  fastify.post(
    "/admin/products",
    { preValidation: [fastify.authenticate] },
    createProductController
  );

  fastify.get("/products", getAllProductsController);

  fastify.get("/products/:id", getProductByIdController);

  fastify.put(
    "/admin/products",
    { preValidation: [fastify.authenticate] },
    editProductController
  );

  fastify.delete(
    "/admin/products/:id",
    { preValidation: [fastify.authenticate] },
    deleteProductController
  );

  fastify.put(
    "/admin/products/quantity",
    { preValidation: [fastify.authenticate] },
    updateProductQuantityController
  );

  fastify.put(
    "/admin/products/price",
    { preValidation: [fastify.authenticate] },
    updateProductPriceController
  );
}
