import Queue from '../../application/queue/Queue'
import ReleaseVacancy from '../../application/usecase/ReleaseVacancy'
import VacanciesPurchased from '../../application/usecase/VacanciesPurchased'
import TicketCancelled from '../../domain/event/TicketCancelled'
import TicketReserved from '../../domain/event/TicketReserved'

export default class QueueController {
  constructor(
    private readonly queue: Queue,
    private readonly vacanciesPurchased: VacanciesPurchased,
    private readonly releaseVacancy: ReleaseVacancy,
  ) {
    queue.on('ticketReserved', async (event: TicketReserved) => {
      await vacanciesPurchased.execute(event)
    })

    queue.on('ticketCancelled', async (event: TicketCancelled) => {
      await releaseVacancy.execute(event)
    })
  }
}
