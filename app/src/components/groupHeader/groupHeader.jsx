import React from "react";
import style from "./style.module.scss";
import Steps from '../courseProsess/CourseProsess';

export default props => 
{
    return (
        <div className={style.container}>
            <div className={style.text}>
                <div className={style.header}>{props.header}</div>
                <div className={style.subHeader}> {props.departmen} / {props.subDepartmen} </div>
            </div>
            <Steps total = {props.allCourse} current = {props.nowCourse} className={style.steps}/>
        </div>
    );
}

