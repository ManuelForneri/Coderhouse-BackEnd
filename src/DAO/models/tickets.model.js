import { ticketsMongoose } from "./mongoose/tickets.mongoose";

class TicketModel {
  async getAll() {
    try {
      const tickets = await ticketsMongoose.find(
        {},
        {
          __v: false,
        }
      );
      return tickets;
    } catch (e) {
      throw e;
    }
  }
  async getLimit(limit) {
    const tickets = await ticketsMongoose
      .find(
        {},
        {
          __v: false,
        }
      )
      .limit(limit);
    return tickets;
  }
  async createCart() {
    const ticketCreated = await ticketsMongoose.create({});
    return ticketCreated;
  }
  async getCartById(tid) {
    const ticket = await ticketsMongoose.findById(tid).populate("user.email");
    if (!ticket) {
      throw new Error("ticket not found");
    }
    return ticket;
  }
}
export const ticketsModel = new TicketModel();
