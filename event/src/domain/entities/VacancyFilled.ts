import crypto from 'crypto'

type Status = 'deleted' | 'created'

export default class VacancyFilled {
  constructor(
    readonly vacancyFilledId: string,
    readonly eventId: string,
    readonly ticketId: string,
    public status: Status,
  ) {}

  public static create(eventId: string, ticketId: string): VacancyFilled {
    const vacancyFilledId = crypto.randomUUID()

    return new VacancyFilled(vacancyFilledId, eventId, ticketId, 'created')
  }

  public delete() {
    this.status = 'deleted'
  }
}
