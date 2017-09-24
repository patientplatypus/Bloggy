
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { counterADD, counterSUBTRACT } from '../../Redux/actions'
import { Button } from 'semantic-ui-react'

function mapDispatchToProps(dispatch) {
    return({
        addtocounter: () => {dispatch(counterADD())},
        subtractfromcounter: ()=>{dispatch(counterSUBTRACT())}
    })
}

function mapStateToProps(state) {
    return({
      counternumber: "Value of the Counter is:" + state.counter
    })
}

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
    }
  }

  addtocounterhandler(){
    console.log('inside addtocounterhandler');
    this.props.addtocounter();
  }

  subtractfromcounterhandler(){
    console.log('inside subtractfromcounterhandler');
    this.props.subtractfromcounter()
  }


  render() {


    return (
      <div>
        <div>
          <h1>
            Login Page
          </h1>
        </div>
        <div style={styles.countertotal}>
          <h1>
            {this.props.counternumber}
          </h1>
        </div>
        <Button primary onClick={()=>{this.addtocounterhandler()}}>
          <p>
            Add to Counter!
          </p>
        </Button>
        <Button primary onClick={()=>{this.subtractfromcounterhandler()}}>
          <p>
            Subtract from Counter!
          </p>
        </Button>
      </div>
    );
  }
};

export default connect(
    mapStateToProps, mapDispatchToProps)(
    LogIn
)
