import React, { useState } from 'react'
import { Input } from 'antd'

const NewMessage = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = value => {
    onSubmit(value)
    setInputValue('')
  }

  return (
    <div>
      <p>New Message</p>
      <Input
        placeholder="message..."
        onChange={e => setInputValue(e.target.value)}
        onPressEnter={e => {
          inputValue && inputValue !== '' ? handleSubmit(inputValue) : null
        }}
        allowClear
        value={inputValue}
      />
    </div>
  )
}

export default NewMessage
