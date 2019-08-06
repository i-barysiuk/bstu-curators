import React from "react";
import style from "./style.module.scss";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faPencilAlt,
  faUsers,
  faArchive
} from "@fortawesome/free-solid-svg-icons";
import Convert from '../../helper/toRim';


function List(props) 
{
    return (
        <div className={style.main}> 
            <div className={style.text}>
                <NavLink><FontAwesomeIcon className={style.icons} icon={faStar}/></NavLink>
                <div className={style.group}>{props.group}</div> 
                <div className={style.kurs}>&nbsp;- {Convert(props.kurs)}</div>
            </div>
            <div>
                <NavLink><FontAwesomeIcon className={style.icons} icon={faPencilAlt}/></NavLink>
                <NavLink><FontAwesomeIcon className={style.icons} icon={faUsers}/></NavLink>
                <NavLink><FontAwesomeIcon className={style.icons} icon={faArchive}/></NavLink>
            </div>
        </div>
    );

}


export default List;