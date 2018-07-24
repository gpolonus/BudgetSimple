import React, { Component } from 'react';
import { setUid, fetchAndSaveNewestData } from '../services/DataService';
import Layout from './Layout/Layout';
import Loading from '../components/Loading/Loading';


export default class extends Component{

  state = {
    data: null
  }

  componentDidMount() {
    setUid(this.props.user.uid);
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