import { v1 } from 'uuid'

const initialState = {
  user: v1(),
  messages: [
    { user: 'Random user', text: 'Test message to display from another user' }
  ]
}

export default initialState
