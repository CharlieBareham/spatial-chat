const express = require('express')
const os = require('os')
const { default: useBreakpoint } = require('antd/lib/grid/hooks/useBreakpoint')
const webSocketserver = require('ws').Server

const app = express()
const wss = new webSocketserver({ port: 9090 })

const users = {}

const sendTo = (connection, message) => connection.send(JSON.stringify(message))

const handleLogin = users => {
  console.log('User logged in ', data.name)
  if (users[data.name]) {
    sendTo(connection, {
      type: 'login',
      success: false
    })
  } else {
    users[data.name] = connection
    connection.name = data.name

    sendto(connection, {
      type: 'login',
      success: true
    })
  }
}
const handleOffer = users => {
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
const handleAnswer = users => {
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

const handleCandidate = users => {
  console.log('Sending candidate to ', data.name)

  const conn = users[data.name]
  if (conn !== null) {
    sendTo(conn, {
      type: 'candidate',
      candidate: data.candidate
    })
  }
}

const handleLeave = users => {
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

    switch (data.type) {
      case 'login':
        handleLogin(users)
        break
      case 'offer':
        handleOffer(users)
        break
      case 'answer':
        handleAnswer(users)
        break
      case 'candidate':
        handleCandidate(users)
        break
      case 'leave':
        handleLeave(users)
        break
      default:
        sendto(connection, {
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

  connection.send('Server says hello!')
})

app.use(express.static('dist'))
app.get('/api/getUsername', (req, res) =>
  res.send({ username: os.userInfo().username })
)

app.listen(process.env.PORT || 8080, () =>
  console.log(`Listening on port ${process.env.PORT || 8080}!`)
)
