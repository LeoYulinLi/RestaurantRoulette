
export const JOIN_ROOM = "JOIN_ROOM"

export const joinRoom = (roomId) => {
  return {
    type: JOIN_ROOM,
    roomId
  }
}
