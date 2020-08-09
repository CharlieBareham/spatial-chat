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
