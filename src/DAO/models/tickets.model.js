import { ticketsMongoose } from "./mongoose/tickets.mongoose";

class TicketModel {
  async getTicketById(tid) {
    try {
      const ticket = await ticketsMongoose.findById(tid);
      return ticket;
    } catch (error) {
      throw new error();
    }
  }
  async createTicket(newTicket) {
    const ticketCreated = await ticketsMongoose.create(ticketCreated);
    return ticketCreated;
  }
}
export const ticketsModel = new TicketModel();
