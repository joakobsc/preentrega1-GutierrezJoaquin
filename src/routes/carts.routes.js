import { Router } from "express";
import CartManager from "../service/CartManager.js";

const router = Router();
const cartManager = new CartManager();

// POST
router.post("/", async (req, res) => {
  try {
    const newCart = await cartManager.createCart();
    res.status(201).json(newCart);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al crear el carrito" });
  }
});

// GET: cid
router.get("/:cid", async (req, res) => {
  try {
    const cartId = parseInt(req.params.cid);
    const cart = await cartManager.getCartById(cartId);
    if (cart) {
      res.json(cart);
    } else {
      res.status(404).json({ error: "Carrito no encontrado" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al obtener el carrito" });
  }
});

// POST: /api/cart/:cid/product/:pid
router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid); // Obtiene el ID del producto desde la URL

    const cart = await cartManager.addProductToCart(cartId, productId);
    if (cart) {
      res.json(cart);
    } else {
      res
        .status(404)
        .json({ error: "Carrito no encontrado o producto no válido" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al agregar el producto al carrito" });
  }
});

// DELETE: cid
router.delete("/:cid", async (req, res) => {
  try {
    const cartId = parseInt(req.params.cid);
    const cart = await cartManager.clearCart(cartId);
    if (cart) {
      res.json(cart);
    } else {
      res.status(404).json({ error: "Carrito no encontrado" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al limpiar el carrito" });
  }
});

export default router;
