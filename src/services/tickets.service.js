import importModels from "../DAO/factory.js";

const models = await importModels();
const ticketsModel = models.tickets;
const productsModel = models.products;

class TicketService {}

export const ticketService = new TicketService();
