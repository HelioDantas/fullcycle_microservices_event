import VacancyFilled from '../../domain/entities/VacancyFilled'

export default interface VacancyFilledRepository {
  getById(vacancyFilledId: string): Promise<VacancyFilled>
  get(eventId: string, ticketId: string): Promise<VacancyFilled | undefined>
  save(vacancyFilled: VacancyFilled): Promise<void>
  update(vacancyFilled: VacancyFilled): Promise<void>
}
