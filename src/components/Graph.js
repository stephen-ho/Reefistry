import React from "react";
import Chart from "react-apexcharts";
import axios from 'axios';

class Graph extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recentData: [],
      options: {
        chart: {
          type: "line"
        },
        xaxis: {
          categories: [1, 2, 3, 4, 5]
        }
      },
      series: [
        {
          name: "series-1",
          data: [30, 40, 45, 50, 49]
        }
      ]
    };
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

  render() {

    let chartData = {
      options: {
        chart: {
          type: "line"
        },
        xaxis: {
          categories: [1, 2, 3, 4, 5]
        }
      },
      series: [
        {
          name: "series-1",
          data: [30, 40, 45, 50, 49]
        }
      ]
    };

    const dates = this.state.recentData.map((doc) => {
      const date = new Date(doc.Date).toLocaleDateString("en-US");
      return date;
    });

    const dataPoints = this.state.recentData.map((doc) => {
      const currentParam = this.props.currentParam;
      return doc[currentParam];
    })

    chartData.options.xaxis.categories = dates;
    chartData.series[0].data = dataPoints;

    // console.log(chartData.series)

    const sortedData = dataPoints.sort((a,b) => a-b);
    const min = sortedData[0];
    const max = sortedData[sortedData.length - 1];
    const sum = sortedData.reduce((partialSum, a) => partialSum + a, 0)
    const avg = Math.round(((sum / sortedData.length) * 10) / 10);

    return (
      <div className="app">
        <div className="row">
          <div className="line-graph">
            <Chart
              options={chartData.options}
              series={chartData.series}
              type="line"
            />
          </div>
          <div className='dataOverview'>
            <p>Min: {min}</p>
            <p>Max: {max}</p>
            <p>Avg: {avg}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Graph;