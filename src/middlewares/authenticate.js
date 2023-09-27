export function authenticate(req, res, next) {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  next();
}

export function checkAdmin(req, res, next) {
  if (req.session?.user && req.session.user.role == "admin") {
    return next();
  } else {
    return res.render("error", {
      title: "Usted no tiene permiso de administrador",
    });
  }
}
export function checkUserCart(req, res, next) {
  const cartUser = req.session.user.cid;
  const cartParams = req.params.cid;
  if (cartUser == cartParams) {
    return next();
  } else {
    const notCart =
      "El carrito al que quieres acceder no corresponde a tu usuario";
    return res.status(500).render("error", { notCart });
  }
}
