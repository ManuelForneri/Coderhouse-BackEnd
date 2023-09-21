export function verificarPassword() {
  // Obtener los valores de los campos de contraseña
  var contraseña1 = document.getElementById("newpass1").value;
  var contraseña2 = document.getElementById("newpass2").value;
  var botonSubmit = document.getElementById("boton-submit-password");

  // Comparar las contraseñas
  if (contraseña1 === contraseña2) {
    // Aquí puedes agregar más lógica si las contraseñas son iguales
    botonSubmit.removeAttribute("disabled");
  } else {
    console.log("no son iguales");
    // Aquí puedes agregar más lógica si las contraseñas no son iguales
  }
}
