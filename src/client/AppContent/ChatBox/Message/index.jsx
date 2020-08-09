import React from 'react'
import { Card } from 'antd'

const Message = ({ user, message }) => {
  const { Meta } = Card
  return (
    <>
      <Card size="small">
        <Meta
          title={message.text}
          description={message.user}
          style={
            user === message.user
              ? { textAlign: 'left' }
              : { textAlign: 'right' }
          }
        />
      </Card>
    </>
  )
}

export default Message
