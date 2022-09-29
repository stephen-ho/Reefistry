import React from 'react';
import axios from 'axios';
import Dashboard from './dashboard.js';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Graph from './Graph.js';

class ParamInfo extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      page: 'graph',
      recentData: [],
    }

    this.handleBack = this.handleBack.bind(this);
  }

  componentDidMount() {
    axios.get(`http://localhost:8080/data/${this.props.currentParam}`)
    .then((response) => {
      //console.log(response.data);
      this.setState({
        recentData: response.data,
      })
    })
    .catch((err) => {
      console.log(err);
    })
  }

  handleBack() {
    this.setState({
      page: 'dash'
    })
  }

  render () {

    const currentParam = this.props.currentParam;

    const dataList = this.state.recentData.map((doc, index) => {
      const date = new Date(doc.Date).toLocaleDateString("en-US")

      return (
        <div className='dataPoint' key={index}>
          <p>{date}</p>
          <p>{doc[currentParam]}</p>
        </div>
      )
    })

    //console.log(this.props.currentParam);

    if (this.state.page === 'dash') {
      return (
        <Dashboard/>
      )
    }

    return (
      <div className='App'>
        <header className="App-header">
          <MenuIcon id='menuIcon' onClick={this.handleMenu}/>
          <h1>{currentParam}</h1>
          <ArrowBackIosNewIcon id='backIcon' onClick={this.handleBack}/>
        </header>
        <div className="graph">
          <Graph currentParam={this.props.currentParam}/>
        </div>
        <div className='dataList'>
          {dataList}
        </div>
      </div>
    );
  }

}

export default ParamInfo;