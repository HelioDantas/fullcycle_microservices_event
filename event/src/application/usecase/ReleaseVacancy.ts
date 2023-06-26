import EventRepository from '../repository/EventRepository'
import VacancyFilledRepository from '../repository/VacancyFilledRepository'

type Input = {
  eventId: string
  ticketId: string
}

export default class ReleaseVacancy {
  constructor(
    private readonly eventRepository: EventRepository,
    private readonly vacancyFilledRepository: VacancyFilledRepository,
  ) {}

  async execute(input: Input): Promise<void> {
    console.log('ReleaseVacancy', input)
    const event = await this.eventRepository.get(input.eventId)
    const vacancyFilled = await this.vacancyFilledRepository.get(
      input.eventId,
      input.ticketId,
    )

    if (vacancyFilled) {
      event.vacancies_purchased -= 1
      await this.eventRepository.update(event)
      vacancyFilled.delete()
      await this.vacancyFilledRepository.update(vacancyFilled)
    }
  }
}
