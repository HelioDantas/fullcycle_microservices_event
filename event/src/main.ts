import express, { Request, Response } from 'express'
import Registry from './infra/registry/Registry'
import EventPgRepository from './infra/repository/EventPgRepository'
import RabbitMQAdapter from './infra/queue/RabbitMQAdapter'
import QueueController from './infra/queue/QueueController'
import VacanciesPurchased from './application/usecase/VacanciesPurchased'
import ReleaseVacancy from './application/usecase/ReleaseVacancy'
import VacancyFilledPgRepository from './infra/repository/VacanciesFilledPgRepository'
import CreateEvent from './application/usecase/CreateEvent'

async function main() {
  const app = express()
  app.use(express.json())
  const port = 3004
  const queue = new RabbitMQAdapter()
  await queue.connect()
  const registry = new Registry()

  registry.provide('EventRepostory', new EventPgRepository())
  registry.provide('VacancyFilledRepository', new VacancyFilledPgRepository())

  registry.provide('Queue', queue)

  registry.provide(
    'VacanciesPurchased',
    new VacanciesPurchased(
      registry.inject('EventRepostory'),
      registry.inject('VacancyFilledRepository'),
      registry.inject('Queue'),
    ),
  )

  registry.provide(
    'ReleaseVacancy',
    new ReleaseVacancy(
      registry.inject('EventRepostory'),
      registry.inject('VacancyFilledRepository'),
    ),
  )

  const t = new QueueController(
    registry.inject('Queue'),
    registry.inject('VacanciesPurchased'),
    registry.inject('ReleaseVacancy'),
  )

  app.get('/', (_, res: Response) => {
    res.send('Hello, World!')
  })

  app.post('/create_event', async (req: Request, res: Response) => {
    const purchaseTicket = new CreateEvent(registry.inject('EventRepostory'))

    const output = await purchaseTicket.execute(req.body)
    res.json(output)
  })

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })
}

main()
