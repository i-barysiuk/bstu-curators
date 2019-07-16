import React from 'react';
import './time.sass';
import moment from 'moment';
import 'moment/locale/ru.js' ;
moment.locale('ru');

class Time extends React.Component 
{   
    constructor(props) 
    {
        super(props);
        this.state = {interval: (60 - moment().format('s')) * 1000}; 
    }

    componentDidMount() 
    {
        this.timerID = setInterval(
          () => this.tick(), this.state.interval);  
    }
    
    componentWillUnmount() 
    {
        clearInterval(this.timerID);
    }
    
    tick() 
    {
        this.setState(
        {
          interval: 60000
        });
    }

    render() 
    {  
      return (
        <div className="Time-menu">
          <div className="Hours-mins-menu">{moment().format('HH:mm')}</div>
          <div className="Date-menu">{moment().format('D MMM YYYY')}</div>
        </div>
      );
    }
}

export default Time;