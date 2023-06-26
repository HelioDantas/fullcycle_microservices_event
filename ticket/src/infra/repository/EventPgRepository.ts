import pgp from 'pg-promise'
import EventRepository from '../../application/repository/EventRepository'
import Event from '../../domain/entities/Event'

export default class EventPgRepository implements EventRepository {
  async get(eventId: string): Promise<Event> {
    const connection = pgp()(
      'postgres://webadm:A123456@10.11.0.2:5432/fullcycle',
    )
    const [eventData] = await connection.query(
      'select * from fullcycle.event where event_id = $1',
      [eventId],
    )
    await connection.$pool.end()

    return new Event(
      eventData.event_id,
      eventData.description,
      parseFloat(eventData.price),
      eventData.capacity,
    )
  }
}
