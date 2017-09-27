import axios from 'axios';

export const saveEMAIL = (email) => {
  return{
    type: 'SAVE_EMAIL',
    data: email
  }
}


// curl -v -H "Accept: application/json" -H "Content-type: application/json" -X POST -d '{“post”:{“post_title”:”yolo”,”post_body”:”hello there sailor“, “user_email”:”email@email.com”}}’  http://localhost:3000/posts


export const sendPOST = (payload) => {
  return(dispatch)=>{

    var axiosinstance = axios.create();
    var authstring = 'Token token='+payload['token'];
    axiosinstance.defaults.headers.common['Authorization'] = authstring;

    axiosinstance.post('http://localhost:3000/posts',{
      post:{
        post_title: payload['post_title'],
        post_body: payload['post_body'],
        user_email: payload['user_email']
      }
    })
    .then((response)=>{
      console.log('response from sendPOST', response);
      console.log('value of response.data', response.data);
      dispatch(AXIOSSUCCESS(response.data, 'SEND_POST'))
      // dispatch(RERETRIEVEUSERPOSTS())
      dispatch(userPOSTS(payload))
    })
    .catch((error)=>{
      console.log('error from sendPOST', error);
      dispatch(AXIOSSUCCESS(error.response, 'ERRORPOST'))
    })
  }
}

export const userPOSTS = (payload) => {
  return(dispatch)=>{
    console.log('value of payload[token]: ', payload['token']);
    var axiosinstance = axios.create();
    var authstring = 'Token token='+payload['token'];
    axiosinstance.defaults.headers.common['Authorization'] = authstring;

    axiosinstance.get('http://localhost:3000/showuserposts')
    .then((response)=>{
      console.log('response from userPOST', response);
      console.log('value of response.data', response.data);
      dispatch(AXIOSSUCCESS(response.data, 'RETRIEVE_USER_POSTS'))
    })
    .catch((error)=>{
      // console.log('error from sendPOST', error);
      dispatch(AXIOSSUCCESS(error, 'ERROR_RETRIEVE_USER_POSTS'))
    })
  }
}






// curl -H "Content-Type: application/json" -d '{"user”:{“name”:”name”, ”email”:”email”,”password":"mypass","password_confirmation":"mypass"}}' http://localhost:3000/users

export const signupUSER = (payload) => {
  console.log('inside signupUSER');
  console.log('value of payload[name]: ', payload['name']);
  console.log('value of payload[email]: ', payload['email']);
  console.log('value of payload[password]: ', payload['password']);
  console.log('value of payload[password_confirmation]: ', payload['password_confirmation']);
  return(dispatch)=>{
    axios.post('http://localhost:3000/users', {
      user:{
        name: payload['name'],
        email: payload['email'],
        password: payload['password'],
        password_confirmation: payload['password_confirmation']
      }
    })
    .then((response)=>{
      console.log('response in signupUSER: ', response);
      let returnvalue = [];

      if (response.data.password!=undefined){
        if (response.data.password['0']['error'] === ' does not match confirmation!'){
          // console.log('password and confirmation do not match');
          returnvalue.push('Password and confirmation do not match!');
        }
      }

      if (response.data.email!=undefined){
        if(response.data.email['0']['error']=== 'taken'){
          // console.log('email already taken');
          returnvalue.push('Email already taken!');
        }
      }

      if (response.data.password!=undefined&&response.data.email!=undefined){
        if(response.data.password['0']['error'] === ' does not match confirmation!'&&response.data.email['0']['error']=== 'taken'){
          returnvalue.push('Password and confirmation do not match AND the email is already taken! Boy are you bad at this!😅');
        }
      }

      if (response.data.created_at!=undefined){
        // console.log('User account has been made!');
        returnvalue.push('User account has been made!')
        returnvalue.push(response.data.token)
      }
      console.log('value of returnvalue: ', returnvalue);
      dispatch(AXIOSSUCCESS(returnvalue, 'SIGNUPUSER'))
    })
    .catch((error)=>{
      console.log('error from signupUSER: ', error);
      dispatch(AXIOSSUCCESS(error.response, 'ERRORLOGIN'))
    })
  }
}


// curl -X POST --data "email=bugs@rubyplus.com&password=123" http://localhost:3010/login.json

export const setTOKEN = (token) => {
  return{
    type: 'SET_TOKEN',
    token: token
  }
}

export const logoutUSER = (token) => {
  console.log('inside logoutUSER');
  return(dispatch) => {

    var axiosinstance = axios.create();
    var authstring = 'Token token='+token;
    axiosinstance.defaults.headers.common['Authorization'] = authstring;

    axiosinstance.delete('http://localhost:3000/logout.json')
    .then((response)=>{
      console.log('response from logoutUSER: ', response);
      dispatch(AXIOSSUCCESS("LOGGEDOUT", "LOGOUTUSER"))
      dispatch(CLEAROLDPOSTS())
    })
    .catch((error)=>{
      console.log('error from logoutUSER: ', error);
      dispatch(AXIOSSUCCESS(error.response, 'ERRORLOGIN'))
    })
  }
}


export const loginUSER = (payload) => {
  console.log('inside loginUSER');
  console.log(payload);
  return(dispatch) => {
    axios.post('http://localhost:3000/login.json',{
      email: payload['email'],
      password: payload['password']
    })
    .then((response)=>{
      console.log('response from loginUSER: ', response);
      dispatch(AXIOSSUCCESS(response, "LOGINUSER"))
    })
    .catch((error)=>{
      console.log('error is: ', error.response);
      dispatch(AXIOSSUCCESS(error.response, 'ERRORLOGIN'))
    })
  }
}

export const CLEAROLDPOSTS = () => {
  return{
    type: 'CLEAR_USER_POSTS'
  }
}

//useful axios const functions on success and on error to be used with redux thunk

export const AXIOSSUCCESS = (array, whereto) => {
  console.log('value of array in AXIOSSUCCESS', array);
  return{
    type: whereto,
    data: array
  }
}


// export const AXIOSERRORLOGINPOST = (error, whereto) => {
//   return{
//     type: "ERRORLOGIN",
//     error: error
//   }
// }

//These actions are in here as dummies - I don't use them, but in many
//assignments you will have previous hooks that are in the REDUX file
//you are working with. Consider these hooks from other people's files.



export const counterADD = () => {
  console.log('inside counterADD');
  return {
    type: 'COUNTER_ADD',
  }
}

export const counterSUBTRACT = () => {
  console.log('inside counterSUBTRACT');
  return {
    type: 'COUNTER_SUBTRACT',
  }
}

export const textCHANGE = newtext => {
  console.log('value of newtext is ', newtext);
  return{
    type: 'TEXT_CHANGE',
    text: newtext
  }
}

//Here's the hooks I used for a previous project

export const AXIOSERROR = (error) => {
  return{
    type: "ERRORLOGIN",
    error: error
  }
}


export const messageCREATE = ({title, message, secret}) => {
  console.log('inside messageCREATE');
  console.log('value of ');
  console.log('secret: ', secret);
  console.log('message: ', message);
  console.log('title:', title);
  return(dispatch) => {
    axios.post('http://localhost:3000/newmessage',{
      message: message,
      title: title,
      secret: secret
    })
    .then((response)=>{
      dispatch(AXIOSSUCCESS([], "CREATE"))
    })
    .catch((error)=>{
      console.log('error is: ', error);
      dispatch(AXIOSERROR())
    })
  }
}


export const messageGET = () => {
  return (dispatch)=>{
    console.log('inside GET ACTION');
    var getarray = [];
    axios.get('http://localhost:3000/allmessages')
    .then((response)=>{
      console.log('response is: ', response);
      response.data.posts.forEach(item=>{
        getarray.push(item)
      })
      console.log('value of temparray: ', getarray);
      dispatch(AXIOSSUCCESS(getarray, "GET"))
    })
    .catch((error)=>{
      console.log('error is: ', error);
      dispatch(AXIOSERROR())
    })
  }
}



export const resetSTATUS = () => {
  console.log('inside resetSTATUS');
  return{
    type: 'RESET'
  }
}



export const messageSEARCH = title => {
  return{
    type: 'SEARCH',
    title: title
  }
}

export const messageUPDATE = (message, secret) => {
  var url = 'http://localhost:3000/editpost/'+message._id
  return (dispatch)=>{
    console.log('inside UPDATE ACTION');
    var getarray = [];
    axios.patch(url, {
      message: message,
      secret: secret
    })
    .then((response)=>{
      console.log('response is: ', response);
      dispatch(AXIOSSUCCESS(response, "UPDATE"))
    })
    .catch((error)=>{
      console.log('error is: ', error);
      dispatch(AXIOSERROR())
    })
  }
}

export const messageDELETE = (message, secret) => {
  return (dispatch) => {
    console.log('inside DELETE ACTION');
    console.log('value of secret: ', secret);
    var url = 'http://localhost:3000/deletepost/'+message._id+'/'+secret
    axios.delete(url, {
      message: message,
      secret: secret
    })
    .then((response)=>{
      console.log('response is ', response);
      dispatch(AXIOSSUCCESS(response, 'DELETE'))
    })
    .catch((error)=>{
      console.log('error is ', error);
      dispatch(AXIOSERROR())
    })
  }
}
