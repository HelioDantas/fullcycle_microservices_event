import Queue from '../../application/queue/Queue'
import ApprovedTicket from '../../application/usecase/ApprovedTicket'
import PaymentAproved from '../../domain/event/PaymentAproved'
import RejectTicket from '../../application/usecase/RejectTicket '
import PaymentReject from '../../domain/event/PaymentReject'
import VacanciesRejected from '../../domain/event/VacanciesRejected'

export default class QueueController {
  constructor(
    private readonly queue: Queue,
    private readonly approvedTicket: ApprovedTicket,
    private readonly rejectTicket: RejectTicket,
  ) {
    queue.on('paymentApproved', async (event: PaymentAproved) => {
      await approvedTicket.execute(event)
    })

    queue.on('paymentReject', async (event: PaymentReject) => {
      await rejectTicket.execute(event)
    })

    queue.on('vacanciesRejected', async (event: VacanciesRejected) => {
      await rejectTicket.execute(event)
    })
  }
}
