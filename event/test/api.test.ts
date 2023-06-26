import axios from 'axios'

test('Criar evento', async () => {
  const input = {
    description: 'f9e7d6b4-1a20-4e7c-bc4a-9e9b75f0c741',
    price: 150,
    capacity: 1000,
  }

  const response = await axios.post('http://localhost:3004/create_event', input)
  const output = response.data
  expect(output.eventId).toBeDefined()
})
