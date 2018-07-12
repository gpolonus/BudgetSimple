import React, { Component } from 'react';
import './Layout.css';
import { save } from '../services/DataService';
import TagSelect from './TagSelect/TagSelect';

class Layout extends Component {

  state = {
    selectedLocation: '',
    selectedTag: '',
    tags: [],
    locations: [],
    amount: 0,
    data: []
  };

  componentDidMount() {
    const data = this.props.data;
    const tags = Object.keys(data);

    this.setState({
      selectedLocation: '',
      selectedTag: '',
      tags,
      locations: this.filterLocations(tags, data),
      amount: 0,
      data
    });
  }

  filterLocations(tags = this.state.tags, data = this.state.data) {
    // get all locations at tags
    const locations = tags.reduce((ac, tag) => {
      return [...ac, ...Object.keys(data[tag])];
    }, []);

    // return the unique locations
    return locations.filter((value, index, list) => {
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
    this.setState({
      amount: e.target.value
    });
  }

  savePurchase = () => {
    const { selectedTag, amount, selectedLocation, tags, data } = this.state;
    const date = Date.now();
    const newTags = [selectedTag, ...tags];
    const newData = {
      ...data,
      [selectedTag]: {
        ...data[selectedTag] || [],
        [selectedLocation]: {
          ...(data[selectedTag] ? data[selectedTag][selectedLocation] || [] : []),
          [date]: amount
        }
      }
    };
    save(selectedLocation, selectedTag, amount, date).then(() => {
      this.setState((state) => ({
        selectedLocation: '',
        selectedTag: '',
        locations: this.filterLocations(newTags, newData),
        tags: newTags,
        amount: 0,
        data: newData
      }));
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
      amount = `${stringAmount}.00`;
    }

    this.setState({ amount });
  }

  render() {
    const disabled = !this.state.amount || !this.state.selectedLocation || !this.state.selectedTag;
    return (
      <div className="Layout">
        <TagSelect value={this.state.selectedTag} values={this.state.tags} change={this.changeTag} />
        <TagSelect value={this.state.selectedLocation} values={this.state.locations} change={this.changeLocation} />
        $<input className="amount-input" type="text" value={this.state.amount} onBlur={this.formatAmount} onChange={this.changeAmount} />
        <div className="save-button">
          <button onClick={this.savePurchase} disabled={ disabled }>Save Purchase</button>
        </div>
      </div>
    );
  }
}

export default Layout;
