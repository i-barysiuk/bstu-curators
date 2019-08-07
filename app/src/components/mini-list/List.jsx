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
        <div className={style.main}> 
            <div className={style.text}>
                <FontAwesomeIcon className={style.icons} icon={faStar}  onClick={props.onStarClick}/>
                <div className={style.group}>{props.group}</div> 
                <div className={style.kurs}>&nbsp;- {Convert(props.kurs)}</div>
            </div>
            <div>
                <FontAwesomeIcon className={style.icons} icon={faPencilAlt} onClick={props.onEditClick}/>
                <FontAwesomeIcon className={style.icons} icon={faUsers}     onClick={props.onStudentsClick}/>
                <FontAwesomeIcon className={style.icons} icon={faArchive}   onClick={props.onArchiveClick}/>
            </div>
        </div>
    );

}

export default List;