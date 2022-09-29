import React from 'react';
import axios from 'axios';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import App from '../App.js';
import AddTest from './AddTest.js';
import DashMenu from './DashMenu.js';
import ParamInfo from './ParamInfo.js'
import Tooltip from '@mui/material/Tooltip';

class Dashboard extends React.Component{
  constructor(props) {
    super(props)
    this.ph = {name: 'pH', abbr: 'pH', min: 7.6, max: 8.4}
    this.state = {
      page: 'dash',
      currentParam: '',
      recentData: [],
      ph: 0,
      alk: 0,
      ca: 0,
      mg: 0,
      prevPh: 0,
      prevAlk: 0,
      prevCa: 0,
      prevMg: 0,
    }

    this.handleMenu = this.handleMenu.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleHome = this.handleHome.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:8080/data')
    .then((response) => {
      //console.log(response.data[0].pH);
      this.setState({
        ph: response.data[0].pH,
        alk: response.data[0].Alk,
        ca: response.data[0].Ca,
        mg: response.data[0].Mg,
        prevPh: response.data[1].pH,
        prevAlk: response.data[1].Alk,
        prevCa: response.data[1].Ca,
        prevMg: response.data[1].Mg,
      });
    })
    .catch((err) => {
      console.log(err)
    })
  }

  handleMenu() {
    this.setState({
      page: 'dashMenu'
    });
  }

  handleAdd() {
    this.setState({
      page: 'addTest'
    });
  }

  handleHome() {
    this.setState({
      page: 'home'
    });
  }

  render() {

    const ph = {name: 'pH', abbr: 'pH', value: this.state.ph, prev: this.state.prevPh, min: 7.8, max: 8.4};
    const alk = {name: 'Alkalinity', abbr: 'Alk', value: this.state.alk, prev: this.state.prevAlk, min: 8, max: 12};
    const ca = {name: 'Calcium', abbr: 'Ca', value: this.state.ca, prev: this.state.prevCa, min: 380, max: 450};
    const mg = {name: 'Magnesium', abbr: 'Mg', value: this.state.mg, prev: this.state.prevMg, min: 1200, max: 1400};
    const no3 = {name: 'Nitrate', abbr: 'No3', value: 25};

    const listedParams = [ph, alk, ca, mg];

    const paramList = listedParams.map((param, index) => {

      let avg = ((param.value + param.prev) / 2);
      let percent = Math.abs(((param.value - param.prev) / avg) * 100);

      const arrow = (param.value > param.prev) ? (<ArrowUpwardIcon/>) : (<ArrowDownwardIcon/>);
      //const valueClass = (percent > 10) ? 'value value--orange' : 'value';
      let valueClass = 'value';
      let tipMsg = 'Looks good!'
      if (param.value > param.max || param.value < param.min) {
        valueClass = valueClass.concat(' value--red');
        tipMsg = 'Out of range!';
      } else if (percent > 10) {
        valueClass = valueClass.concat(' value--orange');
        tipMsg = '> 10% difference!';
      }

      return (
        <div className='dashParam' key={index} onClick={() => {this.setState({page: 'paramInfo', currentParam: param.abbr})}}>
          <h2>{param.abbr}</h2>
          <Tooltip title={tipMsg}>
            <h2 className={valueClass}>{param.value}</h2>
          </Tooltip>
          {arrow}
        </div>
      );
    });

    if (this.state.page === 'home') {
      return (
        <App/>
      )
    }

    if (this.state.page === 'paramInfo') {
      return (
        <ParamInfo currentParam={this.state.currentParam}/>
      )
    }

    if (this.state.page === 'addTest') {
      return (
        <AddTest/>
      )
    }

    if (this.state.page === 'dashMenu') {
      return (
        <DashMenu listedParams={listedParams}/>
      )
    }

    return (
      <div className='App'>
        <header className="App-header">
          <MenuIcon id='menuIcon' onClick={this.handleMenu}/>
          <h1 onClick={this.handleHome}>Display</h1>
          <AddIcon id='addIcon' onClick={this.handleAdd}/>
        </header>
        <div className='dashParams'>
          {paramList}
        </div>
      </div>
    )
  }
}

export default Dashboard;