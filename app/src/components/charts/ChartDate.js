import React, { Component } from 'react';
import Chart from './Chart';

class ChartData extends Component {
  constructor(){
    super();
    this.state = {
      chartData:{}
    }
  }

  componentWillMount(){
    this.getChartData();
  }

  getChartData(){
    // Ajax calls here
    this.setState({
      chartData:{
        labels: ['Ваня', 'Аня', 'Сеня', 'Миша', 'Илья', 'Максим', 'Леша', 'Вадим'],
        
        datasets:[
          {            
            label:'Поинты',
            data:[
              80,
              20,
              30,
              25,
              15,
              13.45,
              17.45,
              21.4
            ],
            backgroundColor:[
              'red',
              'blue',
              'yellow',
              'green',
              'pink',
              'gray',
              'brown',
              'black',
            ]
          }
        ]
      }
    });
  }

  render() {
    return (
      <div>
        <Chart chartData={this.state.chartData} location="Нашем проекте" legendPosition="bottom"/>
      </div>
    );
  }
}

export default ChartData;
