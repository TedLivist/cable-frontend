import { useEffect, useState } from 'react';
import * as ActionCable from 'actioncable'
import { fetch_messages } from '../helpers/fetch_messages';

const Chat = () => {

  const [chats, setChats] = useState([])
  let count = 0

  useEffect(() => {
    const cable = ActionCable.createConsumer('ws://localhost:3000/cable')

    const channel = cable.subscriptions.create('MessageChannel', {
      received: (data) => {
        // 'functional form of state update with 'setChats' function'
        // updates the current state with data concurrently
        // unlike setChats([...chats, data])
        setChats(prevChats => [ ...prevChats, data ])
      }
    })

    // Important for cleaning up the UI.
    // When removed triple renders 'data' above which we don't want
    return () => {
      channel.unsubscribe()
    }
  })

  useEffect(() => {
    const fetchChats = async () => {
      const chats = await fetch_messages()
      setChats(chats)
    }
    fetchChats()
  }, [])
  
  return (
    <div>
      {chats.map((chat) => {
        count += 1
        return (
          <div key={count}>
            <strong>{chat.username}</strong> wrote {chat.text}
          </div>
        )})}
    </div>
  );
}
 
export default Chat;