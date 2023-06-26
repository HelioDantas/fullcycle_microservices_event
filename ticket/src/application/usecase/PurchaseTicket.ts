import Ticket from '../../domain/entities/Ticket'
import TicketReserved from '../../domain/event/TicketReserved'
import Queue from '../queue/Queue'
import EventRepository from '../repository/EventRepository'
import TicketRepository from '../repository/TicketRepository'

type Input = {
  eventId: string
  email: string
  creditCardToken: string
}

type Output = {
  ticketId: string
  status: string
}

export default class PurchaseTicket {
  constructor(
    private readonly ticketRepository: TicketRepository,
    private readonly eventRepository: EventRepository,
    private readonly queue: Queue,
  ) {}

  async execute(input: Input): Promise<Output> {
    const event = await this.eventRepository.get(input.eventId)

    const ticket = Ticket.create(input.eventId, input.email)
    await this.ticketRepository.save(ticket)
    const tickerReseverd = new TicketReserved(
      ticket.ticketId,
      ticket.eventId,
      input.creditCardToken,
      event.price,
      input.email,
    )

    await this.queue.publish('ticketReserved', tickerReseverd)

    return {
      ticketId: ticket.ticketId,
      status: ticket.status,
    }
  }
}
