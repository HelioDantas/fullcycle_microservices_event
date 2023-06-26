export type Input = {
  email: string
  creditCardToken: string
  price: number
}

export type Output = {
  tid: string
  status: 'approved' | 'reject'
  price: number
}

export default interface PaymentGateway {
  createTransaction(input: Input): Promise<Output>
}
