import axios from 'axios'

test('Deve comprar um ingresso', async () => {
  const input = {
    eventId: 'f9e7d6b4-1a20-4e7c-bc4a-9e9b75f0c741',
    email: 'helio_dantas@outlook.com',
    createCardToken: '4894981914',
  }

  const response = await axios.post(
    'http://localhost:3003/purchase_ticket',
    input,
  )
  const output = response.data

  expect(output.status).toBe('reserved')
  expect(output.ticketId).toBeDefined()
})

test('Deve comprar um ingresso mesmo com evento lotado', async () => {
  const input = {
    eventId: 'b5a1faf6-ef57-4ede-b491-06d9ca0257bc',
    email: 'helio_dantas@outlook.com',
    createCardToken: '4894981914',
  }

  const response = await axios.post(
    'http://localhost:3003/purchase_ticket',
    input,
  )
  const output = response.data

  expect(output.status).toBe('reserved')
  expect(output.ticketId).toBeDefined()
})
