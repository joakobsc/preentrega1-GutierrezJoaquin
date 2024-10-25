import express from "express";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.routes.js";
import __dirname from "./utils.js";
import handlebars from "express-handlebars";
import viewRouter from "./routes/views.router.js"; // Asegúrate de que esté en minúsculas
import { Server } from "socket.io";
import ProductManager from "./service/ProductManager.js"; // Asegúrate de que ProductManager esté correctamente importado

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

// Inicializa ProductManager
const productManager = new ProductManager();

// Configuramos Handlebars como motor de plantillas
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

// Rutas de vista
app.use("/", viewRouter);
app.use("/api/products", productsRouter);
app.use("/api/cart", cartsRouter);

// Iniciar el servidor HTTP
const httpServer = app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});

// Nueva instancia de Socket.io
const socketServer = new Server(httpServer);

// Se implementa todo lo relacionado con sockets
socketServer.on("connection", async (socket) => {
  console.log("Nuevo cliente conectado");

  socket.on("userConnected", ({ user }) => {
    console.log(`${user} se ha conectado`); // Puedes hacer lo que necesites con el nombre
  });

  // Enviar la lista inicial de productos al cliente cuando se conecta
  socket.emit("productList", await productManager.getAllProducts());

  // Manejar el evento para agregar un producto
  socket.on("addProduct", async (product) => {
    await productManager.addProduct(product);
    socketServer.emit("productList", await productManager.getAllProducts()); // Actualizar para todos los clientes
  });

  // Manejar el evento para eliminar un producto
  socket.on("deleteProduct", async (productId) => {
    await productManager.deleteProduct(productId);
    socketServer.emit("productList", await productManager.getAllProducts()); // Actualizar para todos los clientes
  });
});
