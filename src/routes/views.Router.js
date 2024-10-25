import { Router } from "express";
import ProductManager from "../service/ProductManager.js"; // Importa ProductManager

const router = Router();
const productManager = new ProductManager(); // Crea una instancia de ProductManager

// Ruta para la vista de inicio
router.get("/", async (req, res) => {
  const products = await productManager.getAllProducts(); // Obtiene todos los productos
  res.render("home", { products, style: "index.css" }); // Pasa los productos a la vista
});

// Ruta para la vista de productos en tiempo real
router.get("/realtimeProducts", async (req, res) => {
  const products = await productManager.getAllProducts(); // Obtiene todos los productos
  res.render("realTimeProducts", { products, style: "index.css" }); // Pasa los productos a la vista
});

export default router;
