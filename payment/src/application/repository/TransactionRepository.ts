import Transaction from '../../domain/entities/Transaction'

export default interface TransactiontRepository {
  save(ticket: Transaction): Promise<void>
}
