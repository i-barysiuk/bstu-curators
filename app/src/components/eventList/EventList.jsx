import React from "react";
import style from "./style.module.scss";
import EventCard from "../eventCard/EventCard";
import Card from '../common/card/Card';
import BigButton from '../common/bigButton/BigButton';
import { faPlus , faFilter } from "@fortawesome/free-solid-svg-icons";
import 'moment/locale/ru';
const moment = require('moment');

var data = [
  {
    title: 'Аттестация 1',
    subTitle:' First attestation',
    icon: 'Аттестация',
    utc: '2019-9-22 12:20',
  },
  {
    title: 'Аттестация 2',
    subTitle:' Second attestation',
    icon: 'Аттестация',
    utc: '2019-9-23 16:40',
  },
  {
    title: 'Донорство',
    subTitle:'Мне не жалко)',
    icon: 'Донорство',
    utc: '2019-9-26 15:00',
  },
  {
    title: 'Зачисление студента',
    subTitle:'welcome',
    icon: 'Зачисление студента',
    utc: '2019-10-2 12:30',
  },
  
];

function EventList(props)
{
  return (
      <div className={style.container}>
        <Card 
        title={'События'}
        buttons={[
        <BigButton icon={faFilter}  onClick={props.onClick}/>, 
        <BigButton icon={faPlus}   primary onClick={props.onClick}/>]}
        >
        <div className={style.cards}>
            {
              data.map((item , index) => 
              {
                item.utc = moment(item.utc);
                data[index].utc = moment(data[index].utc);
                if(index === 0 || item.utc.format('M') !== data[index - 1].utc.format('M'))
                  return (
                    <div className={style.itemX2}>
                      <div className = {style.month}> {data[index].utc.format('MMMM')} </div>
                      <div key={item.id} className = {style.item}>  
                        <EventCard 
                        event ={item.icon} 
                        title={item.title} 
                        subTitle={item.subTitle}
                        utc= {item.utc}
                        />  
                      </div>  
                    </div>);
                else 
                  return (
                    <div key={item.id} className = {style.item}>  
                      <EventCard 
                      event ={item.icon} 
                      title={item.title} 
                      subTitle={item.subTitle}
                      utc= {item.utc}
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
 