import { Router } from "express";
import ProductManager from "../service/ProductManager.js"; // Importa ProductManager
import { productsModel } from "../models/product.model.js";
const router = Router();

// Crea una instancia de ProductManager
const productManager = new ProductManager();

// Ruta para la vista de inicio SIN PAGINACION
/* router.get("/", async (req, res) => {
  const products = await productManager.getAllProducts(); // Obtiene todos los productos
  res.render("home", { products, style: "index.css" }); // Pasa los productos a la vista
}); */

//Ruta para la vista de inicio con PAGINACION

router.get("/products", async (req, res) => {
  try {
    // Extraemos la página actual y la cantidad de productos por página
    const page = parseInt(req.query.page) || 1;
    const limit = 5; // Número de productos por página

    // Calcular el salto para la paginación
    const skip = (page - 1) * limit;

    // Obtener productos con paginación
    const products = await productsModel.find().skip(skip).limit(limit);

    // Obtener el total de productos para calcular el número de páginas
    const totalProducts = await productsModel.countDocuments();

    // Calcular el número total de páginas
    const totalPages = Math.ceil(totalProducts / limit);

    // Renderizar la vista 'index.handlebars' con los productos y la paginación
    res.render("home", {
      products,
      currentPage: page,
      totalPages,
      style: "index.css",
    });
  } catch (error) {
    console.log("Error al obtener productos:", error); // Agrega esta línea para ver el error detallado
    res.status(500).json({ error: "Error al obtener productos" });
  }
});

// Ruta para la vista de productos en tiempo real
router.get("/realtimeProducts", async (req, res) => {
  const products = await productManager.getAllProducts(); // Obtiene todos los productos
  res.render("realTimeProducts", { products, style: "index.css" }); // Pasa los productos a la vista
});

export default router;
