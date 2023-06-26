import Registry from './infra/registry/Registry'
import FakePaymentGateway from './infra/gateway/FakePaymentGateway'
import TransactionPgRepository from './infra/repository/TransactionPgRepository'
import ProcessPayment from './application/usecase/ProcessPayment'
import RabbitMQAdapter from './infra/queue/RabbitMQAdapter'
import QueueController from './infra/queue/QueueController'

async function main() {
  const queue = new RabbitMQAdapter()
  await queue.connect()
  const registry = new Registry()

  registry.provide('PaymentGateway', new FakePaymentGateway())
  registry.provide('TransactionRepostory', new TransactionPgRepository())
  registry.provide('Queue', queue)
  registry.provide(
    'ProcessPayment',
    new ProcessPayment(
      registry.inject('PaymentGateway'),
      registry.inject('TransactionRepostory'),
      registry.inject('Queue'),
    ),
  )

  const t = new QueueController(
    registry.inject('Queue'),
    registry.inject('ProcessPayment'),
  )
}

main()
