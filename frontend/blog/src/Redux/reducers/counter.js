const counter = (state = 0, action) => {
  switch (action.type) {
    case 'COUNTER_ADD':
      console.log('inside counterADD reducer!');
      return state = state + 1;
    case 'COUNTER_SUBTRACT':
      console.log('inside counterSUBTRACT reducer!');
      return state = state - 1;
    default:
      return state
  }
}

export default counter
