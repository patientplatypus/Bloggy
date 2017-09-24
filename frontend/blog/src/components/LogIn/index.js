
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { counterADD, counterSUBTRACT } from '../../Redux/actions'


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
    backgroundColor: 'black',
    color: 'white',
    padding: '5%'
  },
  subtractbutton:{
    backgroundColor: 'black',
    color: 'white',
    padding: '5%'
  },
  countertotal:{
    backgroundColor: 'purple',
    color: 'orange',
    padding: '5%'
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
        <div style={styles.addbutton} onClick={()=>{this.addtocounterhandler()}}>
          <p>
            Add to Counter!
          </p>
        </div>
        <div style={styles.subtractbutton} onClick={()=>{this.subtractfromcounterhandler()}}>
          <p>
            Subtract from Counter!
          </p>
        </div>
      </div>
    );
  }
};

export default connect(
    mapStateToProps, mapDispatchToProps)(
    LogIn
)
