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
      eventData.vacancies_purchased,
    )
  }

  async save(event: Event): Promise<void> {
    const connection = pgp()(
      'postgres://webadm:A123456@10.11.0.2:5432/fullcycle',
    )
    await connection.query(
      'insert into fullcycle.event (event_id, description, price, capacity, vacancies_purchased) values ($1, $2, $3, $4, $5)',
      [
        event.eventId,
        event.description,
        event.price,
        event.capacity,
        event.vacancies_purchased,
      ],
    )
    await connection.$pool.end()
  }

  async update(event: Event): Promise<void> {
    const connection = pgp()(
      'postgres://webadm:A123456@10.11.0.2:5432/fullcycle',
    )
    await connection.query(
      'update fullcycle.event set description = $2, price = $3, capacity = $4, vacancies_purchased = $5 where event_id = $1',
      [
        event.eventId,
        event.description,
        event.price,
        event.capacity,
        event.vacancies_purchased,
      ],
    )
    await connection.$pool.end()
  }
}
