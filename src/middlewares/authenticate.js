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
    let data = {
      title: "Error no tiene permiso para entrar aqui",
      text: "Usted no es un administrador o premium",
    };
    return res.render("error", data);
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
export function checkingRolePermissions(req, res, next) {
  if (req.session.user.role === "admin" || "premium") {
    return next();
  } else {
    let data = {
      title: "Error no tiene permiso para entrar aqui",
      text: "Usted no es un administrador o premium",
    };
    return res.render("error", data);
  }
}
