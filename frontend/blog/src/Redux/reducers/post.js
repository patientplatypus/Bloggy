const post = (state = 0, action) => {
  switch (action.type) {
    case 'SEND_POST':
      console.log('inside SEND_POST reducer!');
      console.log('value of state.data', action.data);
      return state = action.data;
    case 'ERROR_POST':
      console.log('inside ERROR_POST reducer!');
      return state = action.error;
    default:
      return state
  }
}

export default post
