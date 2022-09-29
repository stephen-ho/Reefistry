import './App.css';
import React from 'react';
import axios from 'axios';
import Widget from './components/widget.js'
import Dashboard from './components/dashboard.js';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      page: 'home',
      display: {
        name: 'Display',
        ph: 0,
        alk: 0,
        ca: 0,
        mg: 0,
      },
      fragTank: {
        name: 'Frag Tank',
        ph: 7.8,
        alk: 12.0,
        ca: 350,
        mg: 1500,
        no3: 35,
        po4: 0.06,
      }
    }
    this.handleAqWidget = this.handleAqWidget.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:8080/data')
    .then((response) => {
      //console.log(response.data[0].pH);
      this.setState({
        display: {
          name: 'Display',
          ph: response.data[0].pH,
          alk: response.data[0].Alk,
          ca: response.data[0].Ca,
          mg: response.data[0].Mg,
        }
      });
    })
    .catch((err) => {
      console.log(err)
    })
  }

  handleAqWidget() {
    console.log('Clicked');
    this.setState({
      page: 'dash'
    })
  }

  render () {
    if (this.state.page === 'dash') {
      return (
        <>
          <Dashboard display={this.state.display}/>
        </>
      )
    }

    return (
      <div className="App">
        <header className="App-header">
          <MenuIcon id='menuIcon'/>
          <h1>Reefistry</h1>
          <AddIcon id='addIcon'/>
        </header>
        <div className="aqList">
          <Widget display={this.state.display} handleAqWidget={this.handleAqWidget}/>
          <div className="aqWidget">
            <h2>{this.state.fragTank.name}</h2>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
