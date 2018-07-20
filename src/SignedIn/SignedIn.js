import React, { Component } from 'react';
import { fetchAndSaveNewestData } from '../services/DataService';
import Layout from '../Layout/Layout';
import fb from '../services/FirebaseService';


export default class extends Component{

  state = {
    data: null
  }

  componentDidMount() {
    fb.uid = this.props.user.uid;
    fetchAndSaveNewestData().then((data) =>
        this.setState({ data })
    );
  }

  render() {
    return (
      this.state.data ?
        <Layout data={this.state.data} /> :
        <div>Loading</div>
    );
  }
}