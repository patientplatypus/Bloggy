
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { counterADD, saveEMAIL, counterSUBTRACT, loginUSER, logoutUSER, setTOKEN } from '../../Redux/actions'
import { Button, Input, Modal, Header } from 'semantic-ui-react'
import renderIf from 'render-if'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import './login.css'


function mapDispatchToProps(dispatch) {
    return({
      logintoserver: (e)=>{dispatch(loginUSER(e))},
      logoutofserver: (e)=>{dispatch(logoutUSER(e))},
      setthetoken: (e)=>{dispatch(setTOKEN(e))},
      saveuseremail: (e)=>{dispatch(saveEMAIL(e))}
    })
}

function mapStateToProps(state) {
    return({
      loginreturn: state.login,
      tokenreturn: state.token,
      emailreturn: state.email
    })
}

const PositionRelative = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`

const Flex1 = styled.div`
  flex: 1;
  text-align: center;
  width: 100%;
`

const InputHolder = styled.div`
  position: absolute;
  width: 100%;
  top: 40%;
  height: 40%;
`

const styles = {
  addbutton:{
    // backgroundColor: 'black',
    // color: 'white',
    padding: '5%',
    margin: '1%',
    border: 'none'
  },
  subtractbutton:{
    // backgroundColor: 'black',
    // color: 'white',
    padding: '5%',
    margin: '1%',
    border: 'none'
  },
  countertotal:{
    backgroundColor: 'purple',
    color: 'orange',
    padding: '5%',
    margin: '1%',
    border: 'none'
  },
}


class LogIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      password: '',
      email: '',
      loginmodalopen: false,
      loginmodaltitle: '',
      loginmodalmessage: ''
    }
  }

  componentDidMount(){
    console.log('inside componentDidMount');
  }

  logouthandler(){
    // this.props.tokenreturn
    this.props.logoutofserver(this.props.tokenreturn)
    this.setState({
      name: '',
      password: '',
      email: ''
    })
  }

  loginhandler(){
    const passarray = {
      name: this.state.name,
      password: this.state.password,
      email: this.state.email
    }
    this.props.logintoserver(passarray)
  }

  componentWillReceiveProps(nextProps){
    console.log('inside componentWillReceiveProps and loginreturn: ', nextProps.loginreturn)

    if(nextProps.loginreturn==="LOGGEDOUT"){
      console.log('inside LOGGEDOUT in componentWillReceiveProps');
      this.props.setthetoken("")
    }

    if (nextProps.loginreturn.status === 401){
      console.log('Unauthorized user, open modal error!');
      this.setState({
        loginmodalopen: true,
        loginmodaltitle: 'Failure!',
        loginmodalmessage: 'Incorrect credentials supplied for log in!'
      })
    }
    if (nextProps.loginreturn.status === 200){
      console.log('User logged in, open modal success');
      this.props.setthetoken(nextProps.loginreturn.data.token);
      this.props.saveuseremail(this.state.email);
      this.setState({
        loginmodalopen: true,
        loginmodaltitle: 'Success!',
        loginmodalmessage: 'You successfully logged in!'
      })
    }
  }

  render() {
    return (
      <PositionRelative>

        {renderIf(this.props.tokenreturn==="")(
          <div>
            <InputHolder>
              <FlexColumn>
                <Flex1>
                  <div>
                    <Header size='huge'>Log In!</Header>
                  </div>
                </Flex1>
                <Flex1>
                  <Input focus size='huge' className='forminput' placeholder='Name' onChange={(e)=>{this.setState({name: e.target.value})}}/>
                </Flex1>
                <Flex1>
                  <Input focus size='huge' className='forminput' placeholder='Email' onChange={(e)=>{this.setState({email: e.target.value})}}/>
                </Flex1>
                <Flex1>
                  <Input focus size='huge' className='forminput' placeholder='Password' onChange={(e)=>{this.setState({password: e.target.value})}}/>
                </Flex1>
                <Flex1>
                  <Button color='red' onClick={()=>{this.loginhandler()}}>
                    <p>
                      Log In!
                    </p>
                  </Button>
                </Flex1>
                <Flex1>
                  <Header size='small'>First time here?</Header>
                  <Button color='blue' onClick={()=>{this.props.history.push('/signup')}}>
                    <p>
                      Sign Up!
                    </p>
                  </Button>
                </Flex1>
              </FlexColumn>
            </InputHolder>
          </div>
        )}

        {renderIf(this.props.tokenreturn!=="")(
          <div>
            <InputHolder>
              <FlexColumn>
                <Flex1>
                  <div>
                    <Header size='huge'>Log Out!</Header>
                  </div>
                </Flex1>
                <Flex1>
                  <Button color='red' onClick={()=>{this.logouthandler()}}>
                    <p>
                      Log Out!
                    </p>
                  </Button>
                </Flex1>
              </FlexColumn>
            </InputHolder>
          </div>
        )}



        <Modal className='loginmodal' open={this.state.loginmodalopen} basic size='small'>
          <Header icon='archive' content={this.state.loginmodaltitle} />
          <Modal.Content>
            <p>{this.state.loginmodalmessage}</p>
          </Modal.Content>
          <Modal.Actions>
            <Button basic color='red' inverted onClick={()=>{this.setState({loginmodalopen: false})}}>
              OK
            </Button>
          </Modal.Actions>
        </Modal>

      </PositionRelative>
    );
  }
};

export default connect(
    mapStateToProps, mapDispatchToProps)(
    withRouter(LogIn)
)
