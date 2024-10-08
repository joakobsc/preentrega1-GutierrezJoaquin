import express from "express";
import productsRouter from "./routes/products.router.js";

const app = express;
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extend: true }));

app.use("/api/products", productsRouter);

app.listen(PORT, () => {
  console.log("listening on port" + PORT);
});
