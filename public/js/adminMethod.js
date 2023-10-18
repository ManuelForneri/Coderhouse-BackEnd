function deleteUser(uid) {
  fetch(`/api/users/${uid}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        console.log("El recurso fue eliminado con éxito.");
      } else {
        console.error(
          "Error al eliminar el recurso:",
          response.status,
          response.statusText
        );
      }
    })
    .catch((error) => {
      console.error("Hubo un error al realizar la solicitud DELETE:", error);
    });
}
