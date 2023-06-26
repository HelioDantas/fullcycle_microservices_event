export default class TicketCancelled {
  constructor(
    readonly ticketId: string,
    readonly eventId: string, // readonly creditCardToken: string, // readonly price: number,
  ) {}
}
