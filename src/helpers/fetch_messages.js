export const fetch_messages = async () => {
  const response = await fetch('http://localhost:3000/api/chats', {
  })
  
  const data = await response.json()
  return data
}