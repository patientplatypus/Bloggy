const email = (state = '', action) => {
  switch (action.type) {
    case 'SAVE_EMAIL':
      console.log('inside SAVE_EMAIL reducer!');
      return state = action.data;
    default:
      return state
  }
}

export default email
