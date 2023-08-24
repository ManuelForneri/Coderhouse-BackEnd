import importModels from "../DAO/factory.js";

const models = await importModels();
const ticketsModel = models.tickets;
//const productsModel = models.products;

class TicketService {
  async createTicket(cid, user) {
    const ticketCreated = await ticketsModel.createTicket(cid, user);

    return ticketCreated;
  }
}

export const TService = new TicketService();
