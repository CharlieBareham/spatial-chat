const Dispatch = (state, { type, payload }) => {
  console.log(state, type, payload)
  switch (type) {
    case 'NEW_MESSAGE':
      return { ...state, ...{ messages: [...state.messages, payload] } }
    default:
      return state
  }
}

export default Dispatch
