class TicketsController {
  getById = async (req, rea) => {
    try {
      const { tid } = req.params;
    } catch (error) {
      throw new error();
    }
  };
}

export const ticketsController = new TicketsController();
