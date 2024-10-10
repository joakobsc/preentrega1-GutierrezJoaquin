import fs from "fs/promises";
import path from "path";
import ProductManager from "./ProductManager.js";
const cartsFilePath = path.resolve("data", "carts.json");

export default class CartManager {
  constructor() {
    this.carts = [];
    this.productManager = new ProductManager();
    this.init();
  }

  async init() {
    try {
      const data = await fs.readFile(cartsFilePath, "utf-8");
      this.carts = JSON.parse(data);
    } catch (error) {
      this.carts = [];
    }
  }

  saveToFile() {
    fs.writeFile(cartsFilePath, JSON.stringify(this.carts, null, 2));
  }

  createCart() {
    const newCart = {
      id: this.carts.length ? this.carts[this.carts.length - 1].id + 1 : 1,
      products: [],
    };
    this.carts.push(newCart);
    this.saveToFile();
    return newCart;
  }

  getCartById(id) {
    return this.carts.find((cart) => cart.id === id);
  }

  addProductToCart(cartId, productId) {
    const cart = this.getCartById(cartId);
    const product = this.productManager.getProductById(productId);

    if (cart && product) {
      // Verificar si el producto ya existe en el carrito
      const existingProduct = cart.products.find(
        (item) => item.product === productId
      );

      if (existingProduct) {
        // Si ya existe, incrementar la cantidad
        existingProduct.quantity += 1;
      } else {
        // Si no existe, agregarlo al carrito
        cart.products.push({ product: productId, quantity: 1 });
      }

      this.saveToFile();
      return cart;
    } else {
      return null;
    }
  }

  clearCart(cartId) {
    const cart = this.getCartById(cartId);
    if (cart) {
      cart.products = [];
      this.saveToFile();
      return cart;
    }
    return null;
  }
}
