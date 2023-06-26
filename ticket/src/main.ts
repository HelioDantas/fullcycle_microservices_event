import express, { Request, Response } from 'express'
import PurchaseTicket from './application/usecase/PurchaseTicket'
import Registry from './infra/registry/Registry'
import EventPgRepository from './infra/repository/EventPgRepository'
import TicketPgRepository from './infra/repository/TicketPgRepository'
import RabbitMQAdapter from './infra/queue/RabbitMQAdapter'
import QueueController from './infra/queue/QueueController'
import ApprovedTicket from './application/usecase/ApprovedTicket'
import RejectTicket from './application/usecase/RejectTicket '

async function main() {
  const app = express()
  app.use(express.json())
  const port = 3003
  const queue = new RabbitMQAdapter()
  await queue.connect()
  const registry = new Registry()

  registry.provide('TicketRepostory', new TicketPgRepository())
  registry.provide('EventRepostory', new EventPgRepository())
  registry.provide('Queue', queue)

  registry.provide(
    'ApprovedTicket',
    new ApprovedTicket(registry.inject('TicketRepostory')),
  )

  registry.provide(
    'RejectTicket',
    new RejectTicket(
      registry.inject('TicketRepostory'),
      registry.inject('Queue'),
    ),
  )

  const t = new QueueController(
    registry.inject('Queue'),
    registry.inject('ApprovedTicket'),
    registry.inject('RejectTicket'),
  )

  app.get('/', (_, res: Response) => {
    res.send('Hello, World!')
  })

  app.post('/purchase_ticket', async (req: Request, res: Response) => {
    const purchaseTicket = new PurchaseTicket(
      registry.inject('TicketRepostory'),
      registry.inject('EventRepostory'),
      registry.inject('Queue'),
    )

    const output = await purchaseTicket.execute(req.body)
    res.json(output)
  })

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })
}

main()
