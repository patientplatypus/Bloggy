
import React, { Component } from 'react';
import {List} from 'semantic-ui-react';
import './list.css'

class ListPosts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      post_body: '',
    }
  }

  // componentWillReceiveProps(nextProps){
  //   console.log('inside componentWillReceiveProps for ListPosts');
  //   console.log('value of nextProps.post_body: ', nextProps.post_body);
  //   console.log('value of this.props.post_body: ', this.props.post_body);
  //   if (nextProps.post_body!=this.props.post_body){
  //     if (nextProps.post_body>10){
  //       this.setState({
  //         post_body: nextProps.post_body.substring(0,10)+"..."
  //       })
  //     }else{
  //       this.setState({
  //         post_body: nextProps.post_body.substring(0,10)
  //       })
  //     }
  //   }
  // }

  render() {


    return (
        <div>
          <List size="huge">
            <List.Item className='listitem'>
            <List.Icon name='file' size='big' className='listicon'/>
              <List.Content className='listcontent'>
                <br/>
                <List.Header>{this.props.post_title}</List.Header>
                <List.Description>{this.props.post_body!=undefined?this.props.post_body.length>10?this.props.post_body.substring(0,10)+'...':this.props.post_body:''}</List.Description>
                <br/>
              </List.Content>
            </List.Item>
          </List>
        </div>
    );
  }
};

export default ListPosts;
