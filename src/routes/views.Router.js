import { Router } from "express";
import ProductManager from "../service/ProductManager.js"; // Importa ProductManager
import { productsModel } from "../models/product.model.js";
import { cartModel } from "../models/cart.model.js";
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
    // Crea un nuevo carrito vacío y guárdalo en la base de datos
    const newCart = new cartModel({ products: [] });
    await newCart.save(); // Guardamos el carrito en la base de datos
    console.log("Nuevo cartId:", newCart._id); // Asegúrate de que esta línea imprima el ID correctamente

    // Extraemos la página actual y la cantidad de productos por página
    const page = parseInt(req.query.page) || 1;
    const limit = 5; // Número de productos por página
    const skip = (page - 1) * limit;

    // Obtener productos con paginación
    const products = await productsModel.find().skip(skip).limit(limit);
    const totalProducts = await productsModel.countDocuments();
    const totalPages = Math.ceil(totalProducts / limit);

    // Renderizar la vista 'home' con los productos, carrito y paginación
    res.render("home", {
      products,
      cart: newCart, // Pasas el carrito completo
      currentPage: page,
      totalPages,
      style: "index.css",
    });
  } catch (error) {
    console.log("Error al obtener productos:", error);
    res.status(500).json({ error: "Error al obtener productos" });
  }
});

// Ruta para la vista de productos en tiempo real
router.get("/realtimeProducts", async (req, res) => {
  const products = await productManager.getAllProducts(); // Obtiene todos los productos
  res.render("realTimeProducts", { products, style: "index.css" }); // Pasa los productos a la vista
});

export default router;
