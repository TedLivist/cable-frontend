import React, { useState } from 'react'
import { send_message } from '../helpers/send_message'

const Form = () => {

  const [username, setUsername] = useState('')
  const [text, setText] = useState('')

  const handleUsername = (e) => {
    setUsername(e.target.value)
  }

  const handleText = (e) => {
    setText(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    await send_message(username, text)
    setUsername('')
    setText('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text' required name="username"
        placeholder='username' value={username}
        onChange={handleUsername} />
      <input
        type='text' required name="text"
        placeholder='text' value={text}
        onChange={handleText} />
      <button type='submit'>Send</button>
    </form>
  );
}
 
export default Form;