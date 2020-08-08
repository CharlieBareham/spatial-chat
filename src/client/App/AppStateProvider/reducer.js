const Dispatch = (state, { type, payload }) => {
  switch (type) {
    default:
      console.log(JSON.stringify({ type, payload }))
      return state
  }
}

export default Dispatch
