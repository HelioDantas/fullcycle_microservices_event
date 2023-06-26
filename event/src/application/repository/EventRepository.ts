import Event from '../../domain/entities/Event'

export default interface EventRepository {
  get(eventId: string): Promise<Event>
  save(event: Event): Promise<void>
  update(event: Event): Promise<void>
}
