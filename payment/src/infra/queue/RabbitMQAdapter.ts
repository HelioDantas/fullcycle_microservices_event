import Queue from '../../application/queue/Queue'
import amqp from 'amqplib'

export default class RabbitMQAdapter implements Queue {
  private connection: any

  async connect(): Promise<void> {
    this.connection = await amqp.connect('amqp://10.11.0.7:5672')
  }

  async on(name: string, callback: Function): Promise<void> {
    const channel = await this.connection.createChannel()
    await channel.assertQueue(name, { durable: true })
    channel.consume(name, async (message: any) => {
      console.log(message.content.toString())
      const input = JSON.parse(message.content.toString())
      await callback(input)
      channel.ack(message)
    })
  }

  async publish(name: string, data: any): Promise<void> {
    const channel = await this.connection.createChannel()
    await channel.assertQueue(name, { durable: true })
    channel.sendToQueue(name, Buffer.from(JSON.stringify(data)))
  }
}
