import React, { Component } from 'react';
import './Layout.css';
import { saveData, constructData } from '../../services/DataService';
import TagSelect from './TagSelect/TagSelect';

class Layout extends Component {

  state = {
    selectedLocation: '',
    selectedTag: '',
    tags: [],
    locations: [],
    amount: '',
    data: {}
  };

  componentDidMount() {
    const data = this.props.data;
    const tags = Object.keys(data).filter(tag => tag[0] !== '_');

    this.setState({
      selectedLocation: '',
      selectedTag: '',
      tags,
      locations: this.filterLocations(tags, data),
      amount: '',
      data
    });
  }

  filterLocations(tags = this.state.tags, data = this.state.data) {
    // get all locations at tags
    const locations = tags.reduce((ac, tag) => {
      return [...ac, ...Object.keys(data[tag])];
    }, []);

    // return the unique locations
    return Layout.unique(locations);
  }

  static unique(array) {
    return array.filter((value, index, list) => {
      return list.indexOf(value) === index;
    });
  }

  changeLocation = (selectedLocation) => {
    this.setState({ selectedLocation });
  }

  changeTag = (selectedTag, filteredTags) => {
    const locations = this.filterLocations(filteredTags);
    this.setState({ selectedTag, locations });
  }

  changeAmount = (e) => {
    const value = e.target.value;
    const amount = value.split('').filter(v => v.match(/[0-9.]/g)).join('');
    this.setState({
      amount
    });
  }

  savePurchase = () => {
    const { selectedTag, amount, selectedLocation, tags, data } = this.state;
    const date = Date.now();
    const newTags = Layout.unique([selectedTag, ...tags]);
    const newData = constructData(data, selectedLocation, selectedTag, amount, date);
    saveData(newData, selectedLocation, selectedTag, amount, date).then(() => {
      this.setState({
        selectedLocation: '',
        selectedTag: '',
        locations: this.filterLocations(newTags, newData),
        tags: newTags,
        amount: '',
        data: newData
      });
    })
  }

  formatAmount = () => {
    let amount;
    const stringAmount = '' + this.state.amount;
    const parts = stringAmount.split('.');
    if(parts[1]) {
      const centsLength = parts[1].length;
      switch (centsLength) {
        case 1:
          amount = `${parts[0]}.${parts[1]}0`;
          break;
        case 2:
          amount = `${parts[0]}.${parts[1]}`;
          break;
        default:
          amount = `${parts[0]}.${parts[1].substring(0, 2)}`;
      }
    } else {
      if(parts[0]) {
        amount = `${parts[0]}.00`;
      } else {
        amount = '';
      }
    }

    this.setState({ amount });
  }

  render() {
    const disabled =
      !this.state.amount ||
      !this.state.selectedLocation ||
      !this.state.selectedTag ||
      parseInt(this.state.amount, 10) === 0 ||
      this.state.amount === '.';

    return (
      <div className="Layout">
        <h3>Tag</h3>
        <TagSelect value={this.state.selectedTag} values={this.state.tags} change={this.changeTag} />
        <h3>Location</h3>
        <TagSelect value={this.state.selectedLocation} values={this.state.locations} change={this.changeLocation} />
        <div class="Amount">
          <h3>Amount</h3>
          $<input className="amount-input" type="text" value={this.state.amount} onBlur={this.formatAmount} onChange={this.changeAmount} />
        </div>
        <div className="save-button">
          <button onClick={this.savePurchase} disabled={disabled}>Save Purchase</button>
        </div>
      </div>
    );
  }
}

export default Layout;
