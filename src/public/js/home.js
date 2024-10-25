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
});
