document
  .getElementById("dinamic-list-products")
  .addEventListener("click", function (event) {
    if (event.target.classList.contains("deleteButton")) {
      const uid = event.target.getAttribute("data-uid");
      console.log(uid);
      eliminarUsuario(uid);
    }
  });

function eliminarUsuario(uid) {
  fetch(`/api/users/${uid}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        // Elimina la fila de la tabla después de eliminar el usuario

        let timerInterval;
        Swal.fire({
          title: "Eliminando usuario",
          html: "Espere un momento<b></b> milliseconds.",
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            const b = Swal.getHtmlContainer().querySelector("b");
            timerInterval = setInterval(() => {
              b.textContent = Swal.getTimerLeft();
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
            location.reload(true);
          },
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
          }
        });
      } else {
        console.error(
          "Error al eliminar el usuario:",
          response.status,
          response.statusText
        );
      }
    })
    .catch((error) => {
      console.error("Hubo un error al realizar la solicitud DELETE:", error);
    });
}
