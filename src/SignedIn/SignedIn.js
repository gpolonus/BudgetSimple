import React, { Component } from 'react';
import { fetchAndSaveNewestData } from '../services/DataService';
import Layout from './Layout/Layout';
import fb from '../services/FirebaseService';
import Loading from '../components/Loading/Loading';


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
        <Loading />
    );
  }
}