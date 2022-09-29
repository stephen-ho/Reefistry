import React from 'react';

function Ph (props) {
  return (
    <div className='param'>
      <h3>pH</h3>
      <p>{props.params.ph}</p>
    </div>
  )
}

export default Ph;