import React from "react";
import style from "./style.module.scss"; 
import {Statistic} from "antd" 

var data = [1.25,2,3,4,5];

class AveragePoint extends React.Component{

    render(){
        return(
            <div className={style.conteiner}>
                <div className={style.title}>Средний балл </div> 
             {/* <Statistic className={style.body} value={9.3} suffix="/ 10" />  */}
            <div className={style.body}>
                <div className={style.number1}>{data[0]}</div>
                <hr className={style.h} />
                <div className={style.number2}>10</div>
                </div>
            </div>
        );
    }
}
export default AveragePoint;