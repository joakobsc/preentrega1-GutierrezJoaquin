import { Router } from "express";
import ProductManager from "../service/ProductManager.js";
const router = Router();

//creamos instancia de la clase ProductManager
const productsManager = new ProductManager();

//Endpoints conf

//GET
router.get("/", async (req, res) => {
  try {
    //Limit
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined;

    const products = await productsManager.getAllProducts(limit);

    res.json(products);
  } catch (error) {
    console.log(error);
  }
});
//GET:pid

router.get("/:pid", async (req, res) => {
  try {
    const productId = parseInt(req.params.pid);
    const product = await productsManager.getProductById(productId);
    if (product) {
      res.json(product);
    } else {
      res.status(400).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    console.log(error);
  }
});

//POST

router.post("/", async (req, res) => {
  try {
    const { id, title, description, code, price, status, stock, category } =
      req.body;
    if (
      !id ||
      !title ||
      !description ||
      !code ||
      !price ||
      !status ||
      !stock ||
      !category
    ) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios" });
    }
    const product = await productsManager.addProduct({
      id,
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
    });
    res.status(201).json(product);
  } catch (error) {
    console.log(error);
  }
});

//PUT:pid

router.put("/:pid", async (req, res) => {
  try {
    const productId = parseInt(req.params.pid);
    const updatedProduct = await productsManager.updateProduct(
      productId,
      req.body
    );
    if (updatedProduct) {
      res.json(updatedProduct);
    } else {
      res.status(404).json({
        error: "Producto no encontrado",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

//DELETE:pid

router.delete("/:pid", async (req, res) => {
  try {
    const productId = parseInt(req.params.pid);
    const deletedProduct = productsManager.deleteProduct(productId);
    if (deletedProduct) {
      res.json(deletedProduct);
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    console.log(error);
  }
});

export default router;
