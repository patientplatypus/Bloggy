const retrieveuserposts = (state = [], action) => {
  switch (action.type) {
    case 'RETRIEVE_USER_POSTS':
      console.log('inside RETRIEVE_USER_POSTS reducer!');
      console.log('value of action.data', action.data.user_posts);
      return state = action.data.user_posts;
    case 'ERROR_RETRIEVE_USER_POSTS':
      console.log('inside ERROR_RETRIEVE_USER_POSTS reducer!');
      // console.log('value of action.error', action.error );
      return state = action.data;
    case 'CLEAR_USER_POSTS':
      console.log('inside CLEAR_USER_POSTS');
      return state = [];
    default:
      return state
  }
}

export default retrieveuserposts
