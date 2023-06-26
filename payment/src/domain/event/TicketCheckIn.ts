export default class TicketCheckIn {
  constructor(
    readonly ticketId: string,
    readonly eventId: string,
    readonly creditCardToken: string,
    readonly price: number,
    readonly email: string,
  ) {}
}
