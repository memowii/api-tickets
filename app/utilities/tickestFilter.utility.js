class TicketsFilter {

  constructor() {
    this.ticketsToSave = [];
    this.tickets = [];
  }

  isStringAlpha(string) {
    return /^[a-zA-Z]+$/.test(string);
  }

  filterUnrepeatedTickets(CSVTickets, DBTickets) {
    let rowIndx = 0;

    if (this.isStringAlpha(CSVTickets[0].field1)) {
      rowIndx = 1;
    }

    for (rowIndx; rowIndx < CSVTickets.length; rowIndx++) {
      let newTicket = [
        /* consecutivo = */ CSVTickets[rowIndx].field1,
        /* esta_usado = */ false
      ];

      if (!this.ticketsToSave.find(ticket => ticket[0] === newTicket[0]) &&
          !this.tickets.find(ticket => ticket[0] === newTicket[0])) {
        this.tickets.push(newTicket);
      }
    }

    this.ticketsToSave = this.ticketsToSave.concat(
      this.tickets.filter((ticket) => {
        return !DBTickets.find((DBTicket) => {
          return ticket[0] === DBTicket.consecutivo;
        });
      })
    );
    this.tickets = [];
  }
}

module.exports = TicketsFilter;
