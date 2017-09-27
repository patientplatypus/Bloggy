const login = (state = [], action) => {
  switch (action.type) {
    case 'LOGINUSER':
      console.log('inside LOGINUSER reducer!');
      console.log('value of action.data', action.data);
      return state = action.data;
    case 'LOGOUTUSER':
      console.log('inside LOGOUTUSER reducer!');
      return state = action.data;
    case 'SIGNUPUSER':
      console.log('inside SIGNUPUSER reducer!');
      return state = action.data;
    case 'ERRORLOGIN':
      console.log('inside ERRORLOGIN');
      return state = action.data;
    default:
      return state
  }
}

export default login
