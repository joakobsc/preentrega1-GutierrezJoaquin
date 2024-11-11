import { Router } from "express";
import ProductManager from "../service/ProductManager.js";
import { productsModel } from "../models/products.model.js";
import mongoose from "mongoose";
const router = Router();

//creamos instancia de la clase ProductManager
const productsManager = new ProductManager();

//Endpoints conf

//GET
router.get("/", async (req, res) => {
  try {
    //Limit
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined;

    /* const products = await productsManager.getAllProducts(limit);

    res.json(products);
 */
    let products = await productsModel.find();
    console.log(products);
    res.send({ result: "success", payload: products });
  } catch (error) {
    console.log(error);
  }
});
//GET:pid

router.get("/:pid", async (req, res) => {
  try {
    /* const productId = parseInt(req.params.pid); */
    /* const product = await productsManager.getProductById(productId); */
    const productId = req.params.pid;
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: "ID inválido" });
    }
    const product = await productsModel.findById(productId);
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
    const { title, description, code, price, stock, category, thumbnail } =
      req.body;
    if (!title || !description || !code || !price || !stock || !category) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios" });
    }
    /* const product = await productsManager.addProduct({
      title,
      description,
      code,
      price,
      stock,
      category,
      thumbnail,
    }); */

    const productData = await productsModel.create({
      title,
      description,
      code,
      price,
      stock,
      category,
      thumbnail,
    });
    res.status(201).send(productData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al crear el producto" });
  }
});

//PUT:pid

router.put("/:pid", async (req, res) => {
  try {
    /* const productId = parseInt(req.params.pid);
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
  } */
    const productId = req.params.pid;
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: "ID inválido" });
    }
    const productUpdate = req.body;
    const updatedProduct = await productsModel.findByIdAndUpdate(
      productId,
      productUpdate,
      { new: true }
    );
    res.status(202).send(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el producto" });
  }
});

//DELETE:pid

router.delete("/:pid", async (req, res) => {
  /*  try {
      const productId = parseInt(req.params.pid);
      const deletedProduct = productsManager.deleteProduct(productId);
      if (deletedProduct) {
        res.json(deletedProduct);
      } else {
        res.status(404).json({ error: "Producto no encontrado" });
      }
    } catch (error) {
      console.log(error);
    } */

  try {
    const productId = req.params.pid;
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: "ID inválido" });
    }
    const deletedProduct = await productsModel.findByIdAndDelete(productId);

    if (deletedProduct) {
      // Si el producto fue eliminado exitosamente
      res.status(200).json({
        message: "Producto eliminado exitosamente",
        product: deletedProduct,
      });
    } else {
      // Si no se encuentra el producto en la base de datos
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar el producto" });
  }
});

export default router;
