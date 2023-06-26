import Queue from '../../application/queue/Queue'
import ProcessPayment from '../../application/usecase/ProcessPayment'
import TicketCheckIn from '../../domain/event/TicketCheckIn'

export default class QueueController {
  constructor(
    private readonly queue: Queue,
    private readonly processPayment: ProcessPayment,
  ) {
    queue.on('ticketCheckIn', async (event: TicketCheckIn) => {
      await processPayment.execute(event)
    })
  }
}
