/* class ProductManager {
  constructor() {
    this.products = [];
  }
  static id = 0;
  addProducts(title, description, price, image, code, stock) {
    ProductManager.id++;
    this.products.push({
      title,
      description,
      price,
      image,
      code,
      stock,
      id: ProductManager.id,
    });
  }
  getProducts() {
    return this.products;
  }
  exist = (id) => {
    return this.products.find((producto) => producto.id === id);
  };
  getProductsById(id) {
    !this.exist(id)
      ? console.log("Not Found")
      : console.log(
          "Aqui esta tu producto" + JSON.stringify(this.exist(id), null, 2)
        );
  }
}

const productos = new ProductManager();

productos.addProducts(
  "Ford Escape",
  "SUV dinámica con un manejo ágil y una cabina moderna, perfecta para familias y escapadas urbanas.",
  28000,
  "imagen1",
  "abc123",
  "12"
);
productos.addProducts(
  "Ford Escape",
  "SUV dinámica con un manejo ágil y una cabina moderna, perfecta para familias y escapadas urbanas.",
  28000,
  "imagen1",
  "abc123",
  "12"
);
productos.addProducts(
  "Ford Escape",
  "SUV dinámica con un manejo ágil y una cabina moderna, perfecta para familias y escapadas urbanas.",
  28000,
  "imagen1",
  "abc123",
  "12"
);
productos.addProducts(
  "Ford Escape",
  "SUV dinámica con un manejo ágil y una cabina moderna, perfecta para familias y escapadas urbanas.",
  28000,
  "imagen1",
  "abc123",
  "12"
);

console.log(productos.getProducts());
productos.getProductsById(1);
 */
