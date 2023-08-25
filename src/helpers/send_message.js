export const send_message = async (username, text) => {
  const response = await fetch('http://localhost:3000/api/chats', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({chat: {username, text}})
  })

  const data = await response.text()
  return data
}