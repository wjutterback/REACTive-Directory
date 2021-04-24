import React from 'react';

function inputField() {

  return (
    <div className='form-outline'>
      <input
        type='search'
        id='form1'
        className='form-control'
        placeholder='Search Employees'
        aria-label='Search'
      />
    </div>
  );
}

export default inputField;
