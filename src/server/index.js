const express = require('express')
const os = require('os')
const webSocketserver = require('ws').Server

const app = express()
const wss = new webSocketserver({ port: 9090 })

const users = {}

const sendTo = (connection, message) => connection.send(JSON.stringify(message))

const handleLogin = ({ users, data, connection }) => {
  console.log('User logged in ', data.name)
  if (users[data.name]) {
    sendTo(connection, {
      type: 'login',
      success: false
    })
  } else {
    users[data.name] = connection
    connection.name = data.name

    sendTo(connection, {
      type: 'login',
      success: true
    })
  }
}
const handleOffer = (users, data) => {
  console.log('Sending offer to ', data.name)

  const conn = users[data.name]
  if (conn !== null) {
    connection.otherName = data.name

    sendTo(conn, {
      type: 'offer',
      offer: data.offer,
      name: connection.name
    })
  }
}
const handleAnswer = (users, data) => {
  console.log('Sending answer to ', data.name)

  const conn = users[data.name]
  if (conn !== null) {
    connection.otherName = data.name
    sendTo(conn, {
      type: 'answer',
      answer: data.answer
    })
  }
}

const handleCandidate = (users, data) => {
  console.log('Sending candidate to ', data.name)

  const conn = users[data.name]
  if (conn !== null) {
    sendTo(conn, {
      type: 'candidate',
      candidate: data.candidate
    })
  }
}

const handleLeave = (users, data) => {
  console.log('User leaving ', data.name)

  const conn = users[data.name]
  if (conn !== null) {
    sendTo(conn, {
      type: 'leave'
    })
  }
}

wss.on('connection', connection => {
  console.log('Connected')

  connection.on('message', message => {
    let data

    try {
      data = JSON.parse(message)
    } catch (e) {
      console.log('Invalid JSON ', message)
      data = {}
    }
    console.log('server data', data)
    switch (data.type) {
      case 'login':
        handleLogin({ users, data, connection })
        break
      case 'offer':
        handleOffer(users, data)
        break
      case 'answer':
        handleAnswer(users, data)
        break
      case 'candidate':
        handleCandidate(users, data)
        break
      case 'leave':
        handleLeave(users, data)
        break
      case 'servertest':
        console.log('servertest', data)
      default:
        sendTo(connection, {
          type: 'error',
          message: 'Command not found ' + data.type
        })
    }
  })

  connection.on('close', () => {
    if (connection.name) {
      delete users[connection.name]

      if (connection.otherName) {
        console.log('Disconnecting from ', connection.otherName)
        const conn = users[connection.otherName]
        conn.otherName = null

        if (conn !== null) {
          sendTo(conn, {
            type: 'leave'
          })
        }
      }
    }
  })

  connection.send(
    JSON.stringify({ message: 'Server says hello!', type: 'connect' })
  )
})

app.use(express.static('dist'))
app.get('/api/getUsername', (req, res) =>
  res.send({ username: os.userInfo().username })
)

app.listen(process.env.PORT || 8080, () =>
  console.log(`Listening on port ${process.env.PORT || 8080}!`)
)
