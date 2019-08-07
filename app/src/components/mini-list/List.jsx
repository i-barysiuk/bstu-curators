import React from "react";
import style from "./style.module.scss";
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
        <div className={style.main}  onClick={props.onClick} > 
            <div className={style.text}>
                <FontAwesomeIcon className={style.icons} icon={faStar}  
                onClick={(e) => 
                {
                    props.onStarClick();
                    e.stopPropagation();
                }}/>
                <div className={style.group}>{props.group}</div> 
                <div className={style.kurs}>&nbsp;- {Convert(props.kurs)}</div>
            </div>
            <div>
                <FontAwesomeIcon className={style.icons} icon={faPencilAlt}  
                onClick={(e) => 
                {
                    props.onEditClick();
                    e.stopPropagation();
                } }/>
                <FontAwesomeIcon className={style.icons} icon={faUsers}     
                onClick={(e) => 
                {
                    props.onStudentsClick();
                    e.stopPropagation();
                } }/>
                <FontAwesomeIcon className={style.icons} icon={faArchive}   
                onClick={(e) => 
                {
                    props.onArchiveClick();
                    e.stopPropagation();
                } }/>
            </div>
        </div>
    );

}


export default List;