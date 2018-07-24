import React, { Component } from 'react';
import './TagSelect.css';
import Tag from '../../../components/Tag/Tag';


export default class TagSelect extends Component {
  state = {
    filteredValues: []
  }

  fixedChange = (e) => this.changeTag(e.target.value);

  changeTag = (value) => {
    const filteredValues = TagSelect.filterValues(value, this.props.values);
    this.setState({ filteredValues });
    this.props.change(value, filteredValues);
  }

  static filterValues(value, values) {
    return values.filter(((tag) => {
      return tag.toLowerCase().indexOf(value.toLowerCase()) > -1;
    }));
  }

  render() {
    let filteredValues;
    if(this.props.value === "") {
      filteredValues = this.props.values;
    } else {
      if (this.state.filteredValues.length) {
        filteredValues = this.state.filteredValues;
      } else {
        filteredValues = TagSelect.filterValues(this.props.value, this.props.values);
      }
    }
    const { value } = this.props;
    return (
      <div className="TagSelect">
          <div>
            <input className="tag-input" type="text" value={value} onChange={this.fixedChange} />
          </div>
          <div className="tags">
            {
              filteredValues.map((tag, i) => (
                <Tag key={`tag-${tag}-${i}`} tag={tag} click={this.changeTag} />
              ))
            }
          </div>
      </div>
    );
  }
}
