import {
  createProduct,
  editProduct,
  deleteProduct,
  updateProductQuantity,
  updateProductPrice,
  getAllProducts,
  getProductById,
} from "../services/productService.js";
import { InternalServerError, NotFoundError } from "../utils/errors.js";

export async function createProductController(request, reply) {
  const { name, description, price, category, quantity } = request.body;

  try {
    const product = await createProduct({
      name,
      description,
      price,
      category,
      quantity,
    });
    return reply
      .code(201)
      .send({ message: "Product created successfully", product });
  } catch (error) {
    request.log.error(error);
    throw new InternalServerError(
      "Error creating product. Details: " + error.message
    );
  }
}

export async function getAllProductsController(request, reply) {
  try {
    const products = await getAllProducts();
    return reply.send({ products });
  } catch (error) {
    request.log.error(error);
    throw new InternalServerError(
      "Error fetching products. Details: " + error.message
    );
  }
}

export async function getProductByIdController(request, reply) {
  const { id } = request.params;

  try {
    const product = await getProductById(id);
    if (!product) {
      throw new NotFoundError(`Product with ID ${id} not found`);
    }
    return reply.send({ product });
  } catch (error) {
    request.log.error(error);
    throw new InternalServerError(
      "Error fetching product. Details: " + error.message
    );
  }
}

export async function editProductController(request, reply) {
  const { id, name, description, price, category } = request.body;

  try {
    const product = await editProduct({
      id,
      name,
      description,
      price,
      category,
    });
    return reply.send({ message: "Product updated successfully", product });
  } catch (error) {
    request.log.error(error);
    throw new InternalServerError(
      "Error updating product. Details: " + error.message
    );
  }
}

export async function deleteProductController(request, reply) {
  const { id } = request.params;

  try {
    await deleteProduct(id);
    return reply.send({ message: "Product deleted successfully" });
  } catch (error) {
    request.log.error(error);
    throw new InternalServerError(
      "Error deleting product. Details: " + error.message
    );
  }
}

export async function updateProductQuantityController(request, reply) {
  const { id, quantity } = request.body;

  try {
    const product = await updateProductQuantity(id, quantity);
    return reply.send({
      message: "Product quantity updated successfully",
      product,
    });
  } catch (error) {
    request.log.error(error);
    throw new InternalServerError(
      "Error updating product quantity. Details: " + error.message
    );
  }
}

export async function updateProductPriceController(request, reply) {
  const { id, price, discount } = request.body;

  try {
    const product = await updateProductPrice(id, price, discount);
    return reply.send({
      message: "Product price updated successfully",
      product,
    });
  } catch (error) {
    request.log.error(error);
    throw new InternalServerError(
      "Error updating product price. Details: " + error.message
    );
  }
}
