import React, { useContext } from 'react'
import { AppStateContext, AppDispatchContext } from '../../App/AppStateProvider'
import { List, Divider, Card } from 'antd'
import NewMessage from './NewMessage'
import Message from './Message'

const Chatbox = () => {
  const { user, messages } = useContext(AppStateContext)
  const dispatch = useContext(AppDispatchContext)

  const handleNewMessage = message => {
    dispatch({ type: 'NEW_MESSAGE', payload: { text: message, user } })
  }

  let connectedUser

  const conn = new WebSocket('ws://localhost:9090')

  conn.open = () => {
    console.log('Connected to signalling server')
  }

  const send = message => {
    if (connectedUser) {
      message.name = connectedUser
    }

    conn.send(JSON.stringify(message))
  }

  const handleConnect = data => {
    console.log('connect', data)

    send({ type: 'login', name: user })
  }

  const handleLogin = success => {
    console.log('successLogin', success)
  }

  conn.onmessage = message => {
    const data = JSON.parse(message.data)

    switch (data.type) {
      case 'connect':
        handleConnect(data)
        break
      case 'login':
        handleLogin(data.success)
        break
      case 'offer':
        handleOffer(data.offer, data.name)
        break
      case 'answer':
        handleAnswer(data.answer)
        break
      case 'candidate':
        handleCandidate(data.candidate)
        break
      case 'leave':
        handleLeave()
        break
      default:
        console.log('default')
        break
    }
  }

  conn.onerror = err => {
    console.log('some error ', err)
  }

  return (
    <>
      <Divider orientation="left">{user}</Divider>
      <List
        dataSource={messages}
        renderItem={item => (
          <List.Item>
            <div style={{ width: '100%' }}>
              <Message user={user} message={item} />
            </div>
          </List.Item>
        )}
      />
      <NewMessage onSubmit={handleNewMessage} />
    </>
  )
}

export default Chatbox
