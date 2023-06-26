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

export default interface Queue {
  connect(): Promise<void>
  on(name: string, callback: Function): Promise<void>
  publish(name: string, data: any): Promise<void>
}
