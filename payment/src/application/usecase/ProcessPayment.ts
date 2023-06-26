import Transaction from '../../domain/entities/Transaction'
import PaymentAproved from '../../domain/event/PaymentAproved'
import PaymentReject from '../../domain/event/PaymentReject'
import PaymentGateway from '../gateway/PaymentGateway'
import Queue from '../queue/Queue'
import TransactiontRepository from '../repository/TransactionRepository'

type Input = {
  ticketId: string
  eventId: string
  price: number
  email: string
  creditCardToken: string
}

export default class ProcessPayment {
  constructor(
    private readonly paymentGateway: PaymentGateway,
    private readonly transactionRepository: TransactiontRepository,
    private readonly queue: Queue,
  ) {}

  async execute(input: Input): Promise<void> {
    console.log('ProcessPayment', input)

    const output = await this.paymentGateway.createTransaction({
      email: input.email,
      creditCardToken: input.creditCardToken,
      price: input.price,
    })

    const transaction = Transaction.create(
      input.ticketId,
      input.eventId,
      output.tid,
      output.price,
      output.status,
    )

    await this.transactionRepository.save(transaction)

    if (output.status === 'approved') {
      const paymentApproved = new PaymentAproved(input.ticketId)
      this.queue.publish('paymentApproved', paymentApproved)
    }

    if (output.status === 'reject') {
      const paymentApproved = new PaymentReject(input.ticketId)
      this.queue.publish('paymentReject', paymentApproved)
    }
  }
}
