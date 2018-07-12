import React, { Component } from 'react';
import './TagSelect.css';


export default class extends Component {
  state = {
    filteredValues: []
  }

  fixedChange = (e) => this.changeTag(e.target.value);

  changeTag = (value) => {
    const filteredValues = this.props.values.filter(((tagSuggestion) => {
      return tagSuggestion.toLowerCase().indexOf(value.toLowerCase()) > -1;
    }));
    this.setState({ filteredValues });
    this.props.change(value, filteredValues);
  }

  render() {
    let filteredValues;
    if(this.props.value === "") {
      filteredValues = this.props.values;
    } else {
      if (this.state.filteredValues.length) {
        filteredValues = this.state.filteredValues;
      } else {
        filteredValues = this.props.values;
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
                <div key={`tag-${tag}-${i}`} className="tag" onClick={() => this.changeTag(tag)}>
                  {tag}
                </div>
              ))
            }
          </div>
      </div>
    );
  }
}
