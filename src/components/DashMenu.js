import React, { useState } from 'react';
import Dashboard from './dashboard.js';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

function DashMenu (props) {
  //console.log(props.listedParams);
  const [page, setPage] = useState('dashMenu');

  const paramList = props.listedParams.map((param, index) => {
    let active = true;
    const valueClass = (active) ? 'editParam' : 'editParam editParam--gray';
    return (
      <div className={valueClass} key={index} onClick={() => {if (active === true) {active = false} else {active = true}}}>
        <h2>{param.abbr}</h2>
      </div>
    );
  });

  if (page === 'dash') {
    return (
      <Dashboard/>
    )
  }

  return (
    <div className='App'>
      <header className="App-header">
        <MenuIcon id='menuIcon'/>
        <h1>Edit Params</h1>
        <ArrowBackIosNewIcon id='backIcon' onClick={() => {setPage('dash')}}/>
      </header>
      <div className='dashParams'>
        {paramList}
      </div>
    </div>
  )
}

export default DashMenu;