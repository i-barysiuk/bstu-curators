import React from "react";
import style from "./style.module.scss";
import EventCard from "../eventCard/EventCard";
import Card from '../common/card/Card';
import BigButton from '../common/bigButton/BigButton';
import { faPlus , faFilter } from "@fortawesome/free-solid-svg-icons";

var data = [
  {
    head: 'Аттестация 1',
    sHead:' Fucking attestation',
    icon: 'Аттестация',
    time:
      {
        hours: 12 ,
        mins: 20 ,
        day: 22 ,
        month: "СЕН",
        Month: "СЕНЯБРЬ"
      }
  },
  {
    head: 'Аттестация 2',
    sHead:' Fucking attestation',
    icon: 'Аттестация',
    time:
      {
        hours: 16 ,
        mins: 40 ,
        day: 23 ,
        month: "СЕН",
        Month: "СЕНЯБРЬ"
      }
  },
  {
    head: 'Донорство',
    sHead:'Здохни нахуй',
    icon: 'Донорство',
    time:
      {
        hours: 15 ,
        mins: "00" ,
        day: 26 ,
        month: "СЕН",
        Month: "СЕНЯБРЬ"
      }
  },
  {
    head: 'Зачисление студента',
    sHead:'welcom нахуй',
    icon: 'Зачисление студента',
    time:
      {
        hours: 12 ,
        mins: 30 ,
        day: 2 ,
        month: "ОКТ",
        Month: "ОКТЯБРЬ"
      }
  }
];

function EventList(props)
{
  return (
      <div className={style.container}>
        <Card 
        title={'События'}
        buttons={[
        <BigButton icon={faFilter} default onClick={props.onClick}/>, 
        <BigButton icon={faPlus}   primary onClick={props.onClick}/>]}
        >
        <div className={style.cards}>
            {
              data.map((item , index) => 
              {
                if((index + 1 !== data.length ) && (item.time.month === data[index + 1].time.month))
                  return (
                  <div key={item.id} className = {style.item}>  
                    <EventCard 
                    event ={item.icon} 
                    header={item.head} 
                    subHeader={item.sHead}
                    time={
                      {hours:  item.time.hours,
                        mins:  item.time.mins,
                        day:   item.time.day,
                        month: item.time.month
                      }} 
                    />  
                  </div>);
                else if(index + 1 !== data.length )
                  return (
                    <div className={style.itemX2}>
                      <div key={item.id} className = {style.item}>  
                        <EventCard 
                        event ={item.icon} 
                        header={item.head} 
                        subHeader={item.sHead}
                        time={
                          {hours:  item.time.hours,
                            mins:  item.time.mins,
                            day:   item.time.day,
                            month: item.time.month
                          }} 
                        />  
                      </div>  
                      <div className = {style.month}> {data[index + 1].time.Month} </div>
                    </div>);  
                    else  return (
                      <div key={item.id} className = {style.item}>  
                        <EventCard 
                        event ={item.icon} 
                        header={item.head} 
                        subHeader={item.sHead}
                        time={
                          {hours:  item.time.hours,
                            mins:  item.time.mins,
                            day:   item.time.day,
                            month: item.time.month
                          }} 
                        />  
                      </div>);
              })
            }
          </div>
        </Card>  
      </div>
  );
}

export default EventList;
 