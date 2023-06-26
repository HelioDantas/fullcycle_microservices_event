import TicketRepository from '../../application/repository/TicketRepository'
import Ticket from '../../domain/entities/Ticket'
import pgp from 'pg-promise'

export default class TicketPgRepository implements TicketRepository {
  async save(ticket: Ticket): Promise<void> {
    const connection = pgp()(
      'postgres://webadm:A123456@10.11.0.2:5432/fullcycle',
    )
    await connection.query(
      'insert into fullcycle.ticket (ticket_id, event_id, email, status) values ($1, $2, $3, $4)',
      [ticket.ticketId, ticket.eventId, ticket.email, ticket.status],
    )
    await connection.$pool.end()
  }

  async update(ticket: Ticket): Promise<void> {
    const connection = pgp()(
      'postgres://webadm:A123456@10.11.0.2:5432/fullcycle',
    )
    await connection.query(
      'update fullcycle.ticket set event_id = $2, email = $3, status = $4 where ticket_id = $1',
      [ticket.ticketId, ticket.eventId, ticket.email, ticket.status],
    )
    await connection.$pool.end()
  }

  async get(ticketId: string): Promise<Ticket> {
    const connection = pgp()(
      'postgres://webadm:A123456@10.11.0.2:5432/fullcycle',
    )
    const [ticketData] = await connection.query(
      'select * from fullcycle.ticket where ticket_id = $1',
      [ticketId],
    )
    await connection.$pool.end()

    return new Ticket(
      ticketData.ticket_id,
      ticketData.event_id,
      ticketData.email,
      ticketData.status,
    )
  }
}
