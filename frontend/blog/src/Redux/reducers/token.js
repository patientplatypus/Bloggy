const token = (state = '', action) => {
  switch (action.type) {
    case 'SET_TOKEN':
      return state = action.token
    default:
      return state
  }
}

export default token
