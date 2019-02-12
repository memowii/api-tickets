class TicketsFilter {

  constructor(CSVTickets, DBTickets) {
    this.CSVTickets = CSVTickets;
    this.DBTickets = DBTickets;
  }

  isStringAlpha(string) {
    return /^[a-zA-Z]+$/.test(string);
  }

  getUnrepeatedTickets() {
    let rowIndx = 0;
    const ticketsToSave = [];

    if (this.isStringAlpha(this.CSVTickets[0].field1)) {
      rowIndx = 1;
    }

    for (rowIndx; rowIndx < this.CSVTickets.length; rowIndx++) {
      let newTicket = [
        /* consecutivo = */ this.CSVTickets[rowIndx].field1,
        /* esta_usado = */ false
      ];

      if (!ticketsToSave.find(ticket => ticket[0] === newTicket[0])) {
        ticketsToSave.push(newTicket);
      }
    }

    return ticketsToSave.filter((ticketToSave) => {
      return !this.DBTickets.find((DBTicket) => {
        return ticketToSave[0] === DBTicket.consecutivo;
      });
    });
  }
}

module.exports = TicketsFilter;
