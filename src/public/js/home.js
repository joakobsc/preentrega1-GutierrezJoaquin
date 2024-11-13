// Inicializar el socket en el cliente
const socket = io();
let user;

// Solicitar el nombre de usuario al cargar la página
Swal.fire({
  icon: "info",
  title: "Bienvenido!",
  text: "Ingrese su nombre para identificarse.",
  input: "text",
  inputPlaceholder: "Nombre de usuario",
  allowOutsideClick: false,
  inputValidator: (value) => {
    if (!value) {
      return "Por favor, ingrese un nombre de usuario.";
    } else {
      user = value; // Guardar el nombre del usuario
      socket.emit("userConnected", { user }); // Emitir evento al servidor
      return null; // No hay error
    }
  },
}).then(() => {
  // Mostrar mensaje de bienvenida en el DOM
  const welcomeMessage = document.getElementById("welcome-message");
  welcomeMessage.innerHTML = `<h2>¡Bienvenido, ${user}!</h2>`;

  // Capturar el evento de clic en el botón "Agregar al carrito"
  const addToCartButtons = document.querySelectorAll(".add-to-cart");

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const productId = e.target.getAttribute("data-product-id");
      const cartId = e.target.getAttribute("data-cart-id");

      // Emitimos el evento 'addToCart' al servidor con el ID del producto y del carrito
      socket.emit("addToCart", { productId, cartId });

      // Mostrar el mensaje de éxito
      Swal.fire({
        icon: "success",
        title: "Producto agregado",
        text: "El producto fue agregado al carrito exitosamente",
        timer: 1500,
        showConfirmButton: false,
      });
    });
  });
});

// Escuchar mensajes de éxito o error desde el servidor
socket.on("cartUpdated", (data) => {
  Swal.fire({
    icon: "success",
    title: "Producto agregado",
    text: data.message,
    timer: 1500,
    showConfirmButton: false,
  });
});

socket.on("error", (data) => {
  Swal.fire({
    icon: "error",
    title: "Error",
    text: data.message,
  });
});
