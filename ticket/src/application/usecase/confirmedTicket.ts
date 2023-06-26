import TicketRepository from '../repository/TicketRepository'

type Input = {
  ticketId: string
}

export default class ConfirmedTicket {
  constructor(private readonly ticketRepository: TicketRepository) {}

  async execute(input: Input): Promise<void> {
    const ticket = await this.ticketRepository.get(input.ticketId)
    ticket.confirme()
    await this.ticketRepository.update(ticket)
  }
}
