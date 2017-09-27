
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { counterADD, counterSUBTRACT, loginUSER, logoutUSER, setTOKEN, signupUSER, sendPOST, userPOSTS } from '../../Redux/actions'
import { Button, Input, Modal, Header, Form, TextArea, List } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import renderIf from 'render-if';
import styled from 'styled-components';
import glamorous from 'glamorous';
import './makeapost.css'
import ListPosts from '../ListPosts/index'


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
  top: 50%;
  height: 40%;
`

const ListHolder = styled.div`
  position: absolute;
  width: 100%;
  text-align: center;
  top: 5%;
  height: 40%;
  overflow: hidden;
  overflow-y: scroll;
`

class MakeAPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messagetitle: '',
      messagebody: '',
      userposts: ['non-initialized']
    }
    console.log('right after this.state in constructor MakeAPost and userposts is: ', this.state.userposts);
  }

  componentDidMount(){
    console.log('value of tokenreturn: ', this.props.tokenreturn);

    setTimeout(()=>{
      const payload={
        token: this.props.tokenreturn
      }
      this.props.getuserposts(payload)
    }, 0)
  }


  componentWillReceiveProps(nextProps){
    console.log('inside componentWillReceiveProps and nextProps.userpostsreturn is ', nextProps.userpostsreturn);
    if(this.props.tokenreturn!=''){
      console.log('inside if statement in componentWillReceiveProps');
      this.setState({
        userposts: nextProps.userpostsreturn
      }, ()=>{
        console.log('after setting userposts and value is: ', this.state.userposts);
      })
    }
  }

  posthandler(){
    console.log('inside posthandler');
    console.log('value of email ', this.props.emailreturn);
    const payload = {
      post_title: this.state.messagetitle,
      post_body: this.state.messagebody,
      user_email: this.props.emailreturn,
      token: this.props.tokenreturn
    }
    this.props.sendthepost(payload)
  }

  render() {

    let ListUserPosts;

    if(this.state.userposts.length!=0){
      ListUserPosts = this.state.userposts.map((post,i) => {
        return (
          <ListPosts key={i} post_body={post.post_body} post_title={post.post_title}/>
        );
      });
    }


    return (
      <PositionRelative>
        {renderIf(this.props.tokenreturn!='')(
          <div>
            {renderIf(this.state.userposts.length===0)(
              <div>
                <div>
                  <Header size='huge'>You have not made any posts yet!</Header>
                </div>
              </div>
            )}
            {renderIf(this.state.userposts.length!=0)(
              <div>
                <ListHolder>
                  {ListUserPosts}
                </ListHolder>
              </div>
            )}
            <InputHolder>
              <FlexColumn>
                <Flex1>
                  <div>
                    <Header size='huge'>Make A Post!</Header>
                  </div>
                </Flex1>
                <Flex1>
                  <Input focus size='huge' className='forminput' placeholder='Name' onChange={(e)=>{this.setState({messagetitle: e.target.value})}}/>
                </Flex1>
                <Flex1/>
                <Flex1>
                  <Form style={{textAlign: 'center'}}>
                    <TextArea placeholder='Write your post here!' onChange={(e)=>{this.setState({messagebody: e.target.value})}} style={{ fontSize: '2vh', minHeight: 200, width: '80%' }} />
                  </Form>
                </Flex1>
                <Flex1/>
                <Flex1>
                  <Button color='red' onClick={()=>{this.posthandler()}}>
                    <p>
                      Post!
                    </p>
                  </Button>
                </Flex1>
              </FlexColumn>
            </InputHolder>
          </div>
        )}
        {renderIf(this.props.tokenreturn==='')(
          <FlexColumn>
            <Flex1/>
            <Flex1>
              <div>
                <Header size='huge'>This is the post making page</Header>
              </div>
            </Flex1>
            <Flex1>
                <Header size='large'>You must be logged in to make a post here!</Header>
            </Flex1>
          </FlexColumn>
        )}
      </PositionRelative>
    );
  }
};


function mapDispatchToProps(dispatch) {
    return({
      // signintoserver: (e)=>{dispatch(signupUSER(e))},
      // setthetoken: (e)=>{dispatch(setTOKEN(e))}
      sendthepost: (e)=>{dispatch(sendPOST(e))},
      getuserposts: (e)=>{dispatch(userPOSTS(e))}
    })
}

function mapStateToProps(state) {
    return({
      tokenreturn: state.token,
      emailreturn: state.email,
      userpostsreturn: state.retrieveuserposts
    })
}


export default connect(
    mapStateToProps, mapDispatchToProps)(
    MakeAPost
)
