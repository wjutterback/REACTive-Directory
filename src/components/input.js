import React, { Component } from 'react';

class Input extends Component {
  handleInputChange({ target }) {
    let value = target.value;
    console.log(value);
  }

  render() {
    return (
      <div className='form-outline'>
        <input
          type='search'
          id='form1'
          className='form-control'
          placeholder='Search Employees'
          aria-label='Search'
          onChange={this.handleInputChange}
        />
      </div>
    );
  }
}
export default Input;
