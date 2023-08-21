//@ts-check
import { format } from "date-fns";
import importModels from "../DAO/factory.js";
import { CServices } from "./carts.service.js";
import { userMongoose } from "../DAO/models/mongoose/users.mongoose.js";

const models = await importModels();
const ticketsModel = models.tickets;
const productsModel = models.products;

class TicketService {
  async readById(code) {
    try {
      const ticket = await ticketsModel.readById(code);
      return ticket;
    } catch (error) {
      throw new error();
    }
  }

  async readAll(cartId) {
    try {
      const tickets = await ticketsModel.readAll(cartId);
      return tickets;
    } catch (error) {
      throw new error();
    }
  }

  async readByRender(tickets) {
    try {
      const formattedTickets = [];

      for (const ticket of tickets) {
        const productIds = ticket.products.map((product) => product.product);
        const productsList = await productsModel.readByIds(productIds);

        const products = productsList.map((product, index) => ({
          title: product.title,
          image: product.thumbnail,
          quantity: ticket.products[index].quantity,
        }));

        const formattedDate = format(
          new Date(ticket.purchase_datetime),
          "dd/MM/yyyy HH:mm"
        );

        formattedTickets.push({
          code: ticket.code,
          purchase_datetime: formattedDate,
          amount: ticket.amount,
          products: products,
        });
      }

      return formattedTickets;
    } catch (error) {
      throw new error();
    }
  }

  async create(purchase, products, user) {
    try {
      const stockCheckResult = await this.verifyStock(products);
      if (stockCheckResult) {
        const cartid = await CServices.getCartById(purchase.cartId);
        purchase.products = cartid.products;
        const newTicket = await ticketsModel.create(purchase);

        await userMongoose.findOneAndUpdate(
          { _id: user._id },
          { $push: { purchase_made: newTicket.code } }
        );

        await CServices.deleteCart(purchase.cartId);

        return newTicket;
      } else {
        return console.log(
          "No se pudo crear el ticket debido a la falta de stock"
        );
      }
    } catch (error) {
      throw new error();
    }
  }

  async verifyStock(products) {
    try {
      for (const productData of products) {
        const productId = productData.product.toString();
        const product = await productsModel.readById(productId);
        if (product.stock >= productData.quantity) {
          product.stock = product.stock - 1;
          await product.save();
          console.log(
            "Stock descontado correctamente. El Stock actual es de: ",
            product.stock
          );
        } else {
          console.log(`No hay suficiente stock para el producto ${productId}`);
          return false;
        }
      }
      return true;
    } catch (error) {
      throw new error();
    }
  }
}

export const ticketService = new TicketService();
