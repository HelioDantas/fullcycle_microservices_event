import crypto from 'crypto'

export default class Event {
  constructor(
    readonly eventId: string,
    readonly description: string,
    readonly price: number,
    readonly capacity: number,
    public vacancies_purchased: number,
  ) {}

  public static create(
    description: string,
    price: number,
    capacity: number,
  ): Event {
    const eventId = crypto.randomUUID()

    return new Event(eventId, description, price, capacity, 0)
  }
}
