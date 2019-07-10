import React from 'react';
import './time.css';

class Time extends React.Component 
{   
    constructor(props) 
    {
        super(props);
        this.state = {date: new Date()}; 
    }

    componentDidMount() 
    {
        this.timerID = setInterval(
          () => this.tick(), 60000 );  
    }
    
    componentWillUnmount() 
    {
        clearInterval(this.timerID);
    }
    
    tick() 
    {
        this.setState(
        {
          date: new Date()
        });
    }

    Minutes()
    {
        if(this.state.date.getMinutes() >= 0  && this.state.date.getMinutes() < 10 )
            return "0" + this.state.date.getMinutes();
        else return this.state.date.getMinutes();    
    }

    Month()
    {
        if(this.state.date.getMonth() === 0)  return "янв" ;
        if(this.state.date.getMonth() === 1)  return "февр";
        if(this.state.date.getMonth() === 2)  return "март";
        if(this.state.date.getMonth() === 3)  return "апр" ;
        if(this.state.date.getMonth() === 4)  return "май" ;
        if(this.state.date.getMonth() === 5)  return "июнь";
        if(this.state.date.getMonth() === 6)  return "июль";
        if(this.state.date.getMonth() === 7)  return "авг" ;
        if(this.state.date.getMonth() === 8)  return "сен" ;
        if(this.state.date.getMonth() === 9)  return "окт" ;
        if(this.state.date.getMonth() === 10) return "нояб";
        if(this.state.date.getMonth() === 11) return "дек" ;
    }

    render() 
    {  
      return (
        <div className="Time-menu">
          <div className="Hours-mins-menu">{this.state.date.getHours()}:{this.Minutes()}</div>
          <div className="Date-menu">{this.state.date.getDate()} {this.Month()} {this.state.date.getFullYear()}</div>
        </div>
      );
    }
}

export default Time;