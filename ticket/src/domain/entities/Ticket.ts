import crypto from 'crypto'

type Status = 'reserved' | 'cancelled' | 'approved' | 'confirmed'

export default class Ticket {
  constructor(
    readonly ticketId: string,
    readonly eventId: string,
    readonly email: string,
    public status: Status,
  ) {}

  public static create(eventId: string, email: string) {
    const ticketId = crypto.randomUUID()
    return new Ticket(ticketId, eventId, email, 'reserved')
  }

  public approve() {
    this.status = 'approved'
  }

  public confirme() {
    this.status = 'confirmed'
  }

  public cancel() {
    this.status = 'cancelled'
  }
}
