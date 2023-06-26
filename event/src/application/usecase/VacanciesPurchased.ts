import VacancyFilled from '../../domain/entities/VacancyFilled'
import TicketCheckIn from '../../domain/event/TicketCheckIn'
import VacanciesRejected from '../../domain/event/VacanciesRejected'
import Queue from '../queue/Queue'
import EventRepository from '../repository/EventRepository'
import VacancyFilledRepository from '../repository/VacancyFilledRepository'

type Input = {
  eventId: string
  ticketId: string
  email: string
  creditCardToken: string
}

export default class VacanciesPurchased {
  constructor(
    private readonly eventRepository: EventRepository,
    private readonly vacancyFilledRepository: VacancyFilledRepository,
    private readonly queue: Queue,
  ) {}

  async execute(input: Input): Promise<void> {
    const event = await this.eventRepository.get(input.eventId)

    event.vacancies_purchased += 1

    if (event.vacancies_purchased > event.capacity) {
      const vacanciesRejected = new VacanciesRejected(
        input.eventId,
        input.ticketId,
      )
      await this.queue.publish('vacanciesRejected', vacanciesRejected)
    }

    if (event.vacancies_purchased <= event.capacity) {
      await this.eventRepository.update(event)
      const vacanciesFilled = VacancyFilled.create(
        input.eventId,
        input.ticketId,
      )
      await this.vacancyFilledRepository.save(vacanciesFilled)
      const tickerReseverd = new TicketCheckIn(
        input.ticketId,
        input.eventId,
        input.creditCardToken,
        event.price,
        input.email,
      )

      await this.queue.publish('ticketCheckIn', tickerReseverd)
    }
  }
}
