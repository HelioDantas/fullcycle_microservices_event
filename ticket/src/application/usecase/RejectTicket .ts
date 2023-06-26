import TicketCancelled from '../../domain/event/TicketCancelled'
import Queue from '../queue/Queue'
import TicketRepository from '../repository/TicketRepository'

type Input = {
  ticketId: string
}

export default class RejectTicket {
  constructor(
    private readonly ticketRepository: TicketRepository,
    private readonly queue: Queue,
  ) {}

  async execute(input: Input): Promise<void> {
    const ticket = await this.ticketRepository.get(input.ticketId)
    ticket.cancel()
    await this.ticketRepository.update(ticket)
    const ticketCancelled = new TicketCancelled(ticket.ticketId, ticket.eventId)
    await this.queue.publish('ticketCancelled', ticketCancelled)
  }
}
