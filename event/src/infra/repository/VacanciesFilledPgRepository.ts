import pgp from 'pg-promise'
import VacancyFilled from '../../domain/entities/VacancyFilled'
import VacancyFilledRepository from '../../application/repository/VacancyFilledRepository'

export default class VacancyFilledPgRepository
  implements VacancyFilledRepository
{
  async getById(vacancyFilledId: string): Promise<VacancyFilled> {
    const connection = pgp()(
      'postgres://webadm:A123456@10.11.0.2:5432/fullcycle',
    )
    const [eventData] = await connection.query(
      'select * from fullcycle.vacancy_filled where vacancy_filled_id = $1',
      [vacancyFilledId],
    )
    await connection.$pool.end()

    return new VacancyFilled(
      eventData.vacancy_filled_id,
      eventData.event_id,
      eventData.ticket_id,
      eventData.status,
    )
  }

  async get(
    eventId: string,
    ticketId: string,
  ): Promise<VacancyFilled | undefined> {
    const connection = pgp()(
      'postgres://webadm:A123456@10.11.0.2:5432/fullcycle',
    )
    const [eventData] = await connection.query(
      'select * from fullcycle.vacancy_filled where event_id = $1 and ticket_id = $2',
      [eventId, ticketId],
    )
    await connection.$pool.end()

    if (!eventData) {
      return undefined
    }

    return new VacancyFilled(
      eventData.vacancy_filled_id,
      eventData.event_id,
      eventData.ticket_id,
      eventData.status,
    )
  }

  async save(vacancyFilled: VacancyFilled): Promise<void> {
    const connection = pgp()(
      'postgres://webadm:A123456@10.11.0.2:5432/fullcycle',
    )
    await connection.query(
      'insert into fullcycle.vacancy_filled (vacancy_filled_id, event_id, ticket_id, status) values ($1, $2, $3, $4)',
      [
        vacancyFilled.vacancyFilledId,
        vacancyFilled.eventId,
        vacancyFilled.ticketId,
        vacancyFilled.status,
      ],
    )
    await connection.$pool.end()
  }

  async update(vacancyFilled: VacancyFilled): Promise<void> {
    const connection = pgp()(
      'postgres://webadm:A123456@10.11.0.2:5432/fullcycle',
    )
    await connection.query(
      'update fullcycle.vacancy_filled set event_id = $2, ticket_id = $3, status = $4 where vacancy_filled_id = $1',
      [
        vacancyFilled.vacancyFilledId,
        vacancyFilled.eventId,
        vacancyFilled.ticketId,
        vacancyFilled.status,
      ],
    )
    await connection.$pool.end()
  }
}
