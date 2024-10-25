import fs from "fs/promises";
import path from "path";
const productosFilePath = path.resolve("data", "productos.json");

export default class ProductManager {
  constructor() {
    this.products = [];
    this.init();
  }

  async init() {
    try {
      const data = await fs.readFile(productosFilePath, "utf-8");
      this.products = JSON.parse(data);
    } catch (error) {
      this.products = [];
    }
  }

  async saveToFile() {
    try {
      await fs.writeFile(
        productosFilePath,
        JSON.stringify(this.products, null, 2)
      );
    } catch (error) {
      console.error("Error al guardar los productos:", error);
    }
  }

  async getAllProducts(limit) {
    // Refresca datos para asegurar que estén actualizados en cada solicitud
    await this.init();
    return limit ? this.products.slice(0, limit) : this.products;
  }

  getProductById(id) {
    return this.products.find((product) => product.id === id);
  }

  async addProduct(product) {
    const newProduct = {
      id: this.products.length
        ? this.products[this.products.length - 1].id + 1
        : 1,
      ...product,
      status: true,
    };
    this.products.push(newProduct);
    await this.saveToFile();
    return newProduct;
  }

  async updateProduct(id, updatedFields) {
    const productIndex = this.products.findIndex(
      (product) => product.id === id
    );
    if (productIndex === -1) return null;

    const updatedProduct = {
      ...this.products[productIndex],
      ...updatedFields,
      id: this.products[productIndex].id,
    };

    this.products[productIndex] = updatedProduct;
    await this.saveToFile();
    return updatedProduct;
  }

  async deleteProduct(id) {
    const productIndex = this.products.findIndex(
      (product) => product.id === id
    );
    if (productIndex === -1) return null;

    const [deletedProduct] = this.products.splice(productIndex, 1);
    await this.saveToFile();
    return deletedProduct;
  }
}
