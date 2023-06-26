import PaymentGateway, {
  Input,
  Output,
} from '../../application/gateway/PaymentGateway'

export default class FakePaymentGateway implements PaymentGateway {
  createTransaction(input: Input): Promise<Output> {
    return Promise.resolve({
      tid: 'dfdf',
      status: Math.random() < 0.5 ? 'approved' : 'reject',
      price: 300,
    })
  }
}
