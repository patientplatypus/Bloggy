
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { counterADD, counterSUBTRACT, loginUSER, logoutUSER, setTOKEN, signupUSER, saveEMAIL } from '../../Redux/actions'
import { Button, Input, Modal, Header } from 'semantic-ui-react'
import renderIf from 'render-if'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import './signup.css'

function mapDispatchToProps(dispatch) {
    return({
      signintoserver: (e)=>{dispatch(signupUSER(e))},
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

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      signupmodalopen: false,
      signupmodaltitle: '',
      signupmodalmessage: ''
    }
  }

  signuphandler(){
    if (this.state.name===''||
        this.state.password===''||
        this.state.email===''||
        this.state.password_confirmation===''){
        this.setState({
        signupmodalopen: true,
        signupmodalmessage: "You must fill in all fields!",
        signupmodaltitle: "Alert!"
      })
    }else{
      const payload = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        password_confirmation: this.state.password_confirmation,
      }
      console.log('value of payload in signuphandler: ', payload);
      this.props.signintoserver(payload)
    }
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.loginreturn!=this.props.loginreturn){
      if(nextProps.loginreturn[0]!='User account has been made!'){
        this.setState({
          signupmodalopen: true,
          signupmodalmessage: nextProps.loginreturn,
          signupmodaltitle: "Alert!",
          name: '',
          email: '',
          password: '',
          password_confirmation: ''
        })
        this.props.setthetoken('')
      }else if (nextProps.loginreturn[0]==="User account has been made!"){
        console.log('inside if loginreturn');
        this.setState({
          signupmodalopen: true,
          signupmodalmessage: nextProps.loginreturn[0],
          signupmodaltitle: "Alert!",
          name: '',
          email: '',
          password: '',
          password_confirmation: ''
        })
        this.props.setthetoken(nextProps.loginreturn[1])
        this.props.saveuseremail(this.state.email)
      }
    }
  }

  render() {
    return (
      <PositionRelative>
        {renderIf(this.props.tokenreturn==='')(
          <InputHolder>
            <FlexColumn>
              <Flex1>
                <div>
                  <Header size='huge'>Sign Up!</Header>
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
                <Input focus size='huge' className='forminput' placeholder='Confirm Password' onChange={(e)=>{this.setState({password_confirmation: e.target.value})}}/>
              </Flex1>
              <Flex1>
                <Button color='red' onClick={()=>{this.signuphandler()}}>
                  <p>
                    Sign Up!
                  </p>
                </Button>
              </Flex1>
            </FlexColumn>
          </InputHolder>
        )}
        {renderIf(this.props.tokenreturn!=='')(
          <Header size='huge'>You are logged in. If you would like to sign up another user, log out and make another account.</Header>
        )}


        <Modal className='signupmodal' open={this.state.signupmodalopen} basic size='small'>
          <Header icon='archive' content={this.state.signupmodaltitle} />
          <Modal.Content>
            <p>{this.state.signupmodalmessage}</p>
          </Modal.Content>
          <Modal.Actions>
            <Button basic color='red' inverted onClick={()=>{this.setState({signupmodalopen: false})}}>
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
    withRouter(SignUp)
)
