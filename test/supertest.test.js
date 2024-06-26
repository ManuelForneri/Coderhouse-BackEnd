import chai from "chai";
import supertest from "supertest";

const expect = chai.expect;
const requester = supertest("http://192.168.1.182:8080/");

describe("TEST API", () => {
  let cookieName;
  let cookieValue;

  describe("ENDPOINT Sessions", () => {
    const mockUser = {
      firstName: "Coder",
      lastName: "Test",
      age: 100,
      email: "codertest@gmail.com",
      password: "123",
      username: "coderTest",
    };

    it("LOGIN", async () => {
      const result = await requester.post("/login").send({
        email: "coderTest",
        password: "123",
      });

      const cookie = result.headers["set-cookie"][0];
      expect(cookie).to.be.ok;

      cookieName = cookie.split("=")[0];
      cookieValue = cookie.split("=")[1];

      expect(cookieName).to.be.ok.and.eql("connect.sid");
      expect(cookieValue).to.be.ok;
    });

    it("REGISTER", async () => {
      const response = await requester.post("/register").send(mockUser);

      if (response.error) {
        throw new Error(response.error.message);
      }

      const { status } = response;

      expect(status).to.equal(302);
    });
  });
  describe("ENDPOINT Products", () => {
    it("GET", async () => {
      const response = await requester.get("api/products");
      if (response.error) {
        throw new Error(response.error.message);
      }
      const { status, _body } = response;
      expect(status).to.equal(200);
      expect(_body.payload).to.be.an.instanceof(Array);
    });
    it("POST", async () => {
      const productMock = {
        title: "Producto de prueba",
        description: "Esta es una descripción de prueba",
        category: "Categoria 1",
        price: 2000,
        thumbnail: "Sin imagen",
        code: "#1",
        stock: 10,
      };
      const response = await requester
        .post("api/products")
        .send(productMock)
        .set("Cookie", [`${cookieName}=${cookieValue}`])
        .set("x-test-request", "true");
      if (response.error) {
        throw new Error(response.error.message);
      }
      const { status, _body } = response;
      expect(status).to.equal(201);
      expect(_body.payload).to.have.property("_id");
    });
    it("PUT", async () => {
      const productIdToUpdate = "647b6a0c2a2deaefe1fc283c";
      const updatedProductData = {
        title: "Actualizacion",
        description: "Actualizando descripcion",
        category: "Categoria actualizada",
        price: 3000,
        thumbnail: "imagen actualizada",
        code: "#1",
        stock: 100,
      };
      const response = await requester
        .put(`api/products/${productIdToUpdate}`)
        .send(updatedProductData)
        .set("x-test-request", "true");
      if (response.error) {
        throw new Error(response.error.message);
      }
      const { status, _body } = response;
      expect(status).to.equal(201);
      expect(_body.payload).to.have.eql(
        `Has actualizado el producto con ID ${productIdToUpdate}`
      );
    });
    it("DELETE", async () => {
      const productIdToDelete = "65272be3d96fa427ea3566de";
      const response = await requester
        .delete(`api/products/${productIdToDelete}`)
        .set("Cookie", [`${cookieName}=${cookieValue}`])
        .set("x-test-request", "true");
      if (response.error) {
        throw new Error(response.error.message);
      }
      const { status, _body } = response;
      expect(status).to.equal(200);
      expect(_body.payload).to.have.eql(
        `Has eliminado el producto con ID ${productIdToDelete}`
      );
    });
  });

  describe("ENDPOINT Carts", () => {
    it("GET", async () => {
      const response = await requester.get("api/carts");
      if (response.error) {
        throw new Error(response.error.message);
      }
      const { status, _body } = response;
      expect(status).to.equal(200);
      expect(_body.payload).to.be.an.instanceof(Array);
    });
    it("POST", async () => {
      const cartId = "6530366d8d70b1d4dbad07d0";
      const prodId = "652c74fa19850f0a3f19c62d";
      const response = await requester
        .post(`api/carts/${cartId}/products/${prodId}`)
        .set("x-test-request", "true");
      if (response.error) {
        throw new Error(response.error.message);
      }
      const { status, _body } = response;
      expect(status).to.equal(200);
      expect(_body.payload.cart).to.have.property("_id");
    });
    it("PUT", async () => {
      const cartId = "6530366d8d70b1d4dbad07d0";
      const updatedCartData = {
        products: [
          {
            product: "652c74fa19850f0a3f19c62d",
            quantity: 2,
          },
        ],
      };
      const response = await requester
        .put(`api/carts/${cartId}`)
        .send(updatedCartData)
        .set("x-test-request", "true");
      if (response.error) {
        throw new Error(response.error.message);
      }
      const { status, _body } = response;
      expect(status).to.equal(200);
      expect(_body.message).to.have.eql("Cart updated successfully");
      expect(_body.cart).to.have.property("_id");
    });
    it("DELETE", async () => {
      const cartIdToDelete = "ToIthONHr1Xm07DlvaADPma9b";
      const response = await requester.delete(`api/carts/${cartIdToDelete}`);
      if (response.error) {
        throw new Error(response.error.message);
      }
      const { status, _body } = response;
      expect(status).to.equal(200);
      expect(_body.message).to.have.eql("Cart cleared successfully");
    });
  });
});
