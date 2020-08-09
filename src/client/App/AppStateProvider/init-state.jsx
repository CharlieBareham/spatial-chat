import { v1 } from 'uuid'

export default {
  user: v1(),
  messages: [
    { user: 'Random user', text: 'Test message to display from another user' }
  ]
}
