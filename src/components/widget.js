import React from 'react';
import Ph from './ph.js';
import Alk from './alk.js';
import Ca from './ca.js';
import Mg from './mg.js';

function Widget (props) {
  console.log(props.display);
  return (
    <div className="aqWidget" onClick={props.handleAqWidget}>
      <div className="widgetHeader">
        <h2>{props.display.name}</h2>
      </div>
      <div className="widgetParams">
        <Ph params={props.display}/>
        <Alk params={props.display}/>
        <Ca params={props.display}/>
        <Mg params={props.display}/>
      </div>
    </div>
  )
}

export default Widget;