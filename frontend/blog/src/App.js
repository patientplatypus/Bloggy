import React, { Component } from 'react';
// import logo from './logo.svg';


import { Route,  BrowserRouter as Router, Link } from 'react-router-dom'
import { Redirect } from 'react-router'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { Provider } from 'react-redux'
import reducersCombined from './Redux/reducers'

import renderIf from 'render-if';
import styled from 'styled-components';
import glamorous from 'glamorous';
import { css } from 'glamor';

import Splash from './components/Splash/index'
import LogIn from './components/LogIn/index'
import SignUp from './components/SignUp/index'
import MakeAPost from './components/MakeAPost/index'
import ViewPosts from './components/ViewPosts/index'
import UserProfile from './components/UserProfile/index'
import OtherUsers from './components/OtherUsers/index'

import './App.css';

let store = createStore(reducersCombined, applyMiddleware(thunk));

const styles = {
  linkstyle: {
    textDecoration: "none"
  }
}


const GridBigContainer = styled.div`
  display: grid;
  grid-template-columns: 15vw 85vw;
  grid-template-rows: 10vh 90vh;
  grid-gap: 0vw;
  overflow: hidden;
  background-color: grey;
`

const SideBar = styled.div`
  grid-column: 1 / 2;
  grid-row: 1 / 3;
  position: relative;
  background-color: tomato;
`

const TopBar = styled.div`
  grid-column: 1 / 3;
  grid-row: 1 / 2;
  position: relative;
  background-color: skyblue;
`

const ContentBox = styled.div`
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  position: relative;
  background: purple;
`

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100%;
`

const Flex1 = styled.div`
  flex: 1;
  text-align: center;
`

class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <Router>
            <GridBigContainer>
              <SideBar>
              </SideBar>
              <TopBar>
                <FlexRow>
                  <Flex1>
                    <Link style = {styles.linkstyle} to="/">Splash Page</Link>
                  </Flex1>
                  <Flex1>
                    <Link style = {styles.linkstyle} to="/login">Log In</Link>
                  </Flex1>
                  <Flex1>
                    <Link style = {styles.linkstyle} to="/signup">Sign Up</Link>
                  </Flex1>
                    <Link style = {styles.linkstyle} to="/makeapost">Make a Post</Link>
                  <Flex1>
                    <Link style = {styles.linkstyle} to="/viewposts">View Posts</Link>
                  </Flex1>
                    <Link style = {styles.linkstyle} to="/profile">Profile</Link>
                  <Flex1>
                    <Link style = {styles.linkstyle} to="/otherusers">Other Users</Link>
                  </Flex1>
                </FlexRow>
              </TopBar>
              <ContentBox>
                <Route path="/" exact render={()=><Splash />}/>
                <Route path="/login" exact render={()=><LogIn />}/>
                <Route path="/signup" exact render={()=><SignUp />}/>
                <Route path="/makeapost" exact render={()=><MakeAPost />}/>
                <Route path="/viewposts" exact render={()=><ViewPosts />}/>
                <Route path="/profile" exact render={()=><UserProfile />}/>
                <Route path="/otherusers" exact render={()=><OtherUsers />}/>
              </ContentBox>
            </GridBigContainer>
          </Router>
        </Provider>
      </div>
    );
  }
}

export default App;
