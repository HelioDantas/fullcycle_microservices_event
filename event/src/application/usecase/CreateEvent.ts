import Event from '../../domain/entities/Event'
import EventRepository from '../repository/EventRepository'

type Input = {
  description: string
  price: number
  capacity: number
}

type Output = {
  eventId: string
}

export default class CreateEvent {
  constructor(private readonly eventRepository: EventRepository) {}

  async execute(input: Input): Promise<Output> {
    const ticket = Event.create(input.description, input.price, input.capacity)
    await this.eventRepository.save(ticket)

    return {
      eventId: ticket.eventId,
    }
  }
}
