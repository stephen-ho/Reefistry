import React from 'react';
import axios from 'axios';
import Dashboard from './dashboard.js'
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Button from '@mui/material/Button';

class AddTest extends React.Component {
  constructor(props) {
    super(props)

    this.state={
      page: 'addTest',
      activeParams: [],
      ph: '',
      alk: '',
      ca: '',
      mg: '',
    }

    this.handlePh = this.handlePh.bind(this);
    this.handleAlk = this.handleAlk.bind(this);
    this.handleCa = this.handleCa.bind(this);
    this.handleMg = this.handleMg.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBack = this.handleBack.bind(this);
  }

  handleBack() {
    this.setState({
      page: 'dash'
    })
  }

  handlePh(e) {
    this.setState({
      ph: e.target.value
    })
  }

  handleAlk(e) {
    this.setState({
      alk: e.target.value
    })
  }

  handleCa(e) {
    this.setState({
      ca: e.target.value
    })
  }

  handleMg(e) {
    this.setState({
      mg: e.target.value
    })
  }

  handleSubmit() {
    axios.post('http://localhost:8080/data', {
      pH: this.state.ph,
      Alk: this.state.alk,
      Ca: this.state.ca,
      Mg: this.state.mg,
      Date: Date.now(),
    })
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    })
  }


  render () {
    if (this.state.page === 'dash') {
      return (
        <Dashboard/>
      )
    }

    return (
      <div className="App">
        <header className="App-header">
          <MenuIcon id='menuIcon'/>
          <h1>Add Test</h1>
          <ArrowBackIosNewIcon id='backIcon' onClick={this.handleBack}/>
        </header>
        <div className='inputFields'>
          <div className='input'>
            <h2>pH</h2>
            <input type='number' value={this.state.ph} onChange={this.handlePh}/>
          </div>
          <div className='input'>
            <h2>Alk</h2>
            <input type='number' value={this.state.alk} onChange={this.handleAlk}/>
          </div>
          <div className='input'>
            <h2>Ca</h2>
            <input type='number' value={this.state.ca} onChange={this.handleCa}/>
          </div>
          <div className='input'>
            <h2>Mg</h2>
            <input type='number' value={this.state.mg} onChange={this.handleMg}/>
          </div>
          <Button variant='contained' onClick={this.handleSubmit}>Submit</Button>
        </div>
      </div>
    )
  }
}

export default AddTest;