import React from "react";
import style from "./style.module.scss";
import { NavLink } from "react-router-dom";
import nf404 from '../../assets/img/404.png';

class NotFound extends React.Component {
  render() 
  {
    return(
        <div className={style.container}>
              <img src={nf404} alt="page not found" className={style.img}/>
          <div className={style.text}>
            Приносим свои извинения за предоставленные неудобаства, запрашиваемая вами страница не найдена или удалена.
            Проверьте корректность вашего URL .
          </div>
          <div className={style.buttons}>
            <NavLink className={style.button} onClick={this.props.history.goBack}>Назад     </NavLink>
            <NavLink to="/" className={style.button}>На главную</NavLink>
          </div>
        </div>          
    );
  }
}

export default NotFound;