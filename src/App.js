import React, { Component } from 'react';
import './App.css';
import Layout from './Layout/Layout';
import { fetchAndSaveNewestData } from './services/DataService';


class App extends Component {

  state = {
    data: null
  }

  componentDidMount() {
    fetchAndSaveNewestData().then((data) =>
        this.setState({ data })
    )
  }

  render() {
    return (
      <div className="App">
        <h1>Budget Simple</h1>
        {
          this.state.data ?
            <Layout data={this.state.data} /> :
            <div>Loading</div>
        }
      </div>
    );
  }
}

export default App;
