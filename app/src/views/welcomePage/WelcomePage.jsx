import React from "react";
import style from "./style.module.scss";
import logo from "../../assets/images/logos/welcomelogo.png";
import { Button } from "antd"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUserEdit,
    faDoorOpen,
    faClock,
    faThumbsUp
  } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom'

class WelcomePage extends React.Component {
    render() 
    {
      return(
            <div className={style.container}>
                <div className={style.header}>
                    <div className={style.logoName}>
                        <img src={logo} className={style.logo} alt="logo" />
                        <div className={style.headline}>BSTU.Кураторы</div>
                    </div>
                    <div className={style.linksInHeader}>
                        <div>
                            <Link to="/register">
                                <FontAwesomeIcon className={style.icons} icon={faUserEdit} /> 
                                    Регистрация
                            </Link>
                        </div>
                        <div>
                            <Link to="/login">
                                <FontAwesomeIcon className={style.icons} icon={faDoorOpen} />
                                    Вход
                            </Link>
                        </div>
                    </div>
                </div>   
                <div className={style.body}>
                    <div className={style.bstuCuratorIs}>
                        <div className={style.welcomeTo}>Добро пожаловать</div>
                        <span className={style.helperText}>BSTU.Кураторы - онлайн помощник, чтобы ничего не упустить.</span>
                    </div>
                    <div className={style.description}>
                        Онлайн приложение для помощи куратору в ведении своей группы, а так же заполнения отчетов и планов.
                    </div>
                    <div className={style.whenever}>
                        <div className={style.everLine}>Когда угодно. Где угодно.</div>
                        <div className={style.threePoints}>
                            <div className={style.point}>
                                <span className={style.pointHeadline}>Быстро <FontAwesomeIcon className={style.icons2} icon={faClock} /> </span>
                                <span className={style.pointDescription}>Ведение и заполнение отчетов онлайн из любого места</span>
                            </div>
                            <div className={style.point}>
                                <span className={style.pointHeadline}>Просто <FontAwesomeIcon className={style.icons2} icon={faThumbsUp} /> </span>
                                <span className={style.pointDescription}>Интуитивно понятное приложение, на которое не нужно будет тратить много времени </span>
                            </div>
                            <div className={style.point}>
                                <span className={style.pointHeadline}>Удобно </span>
                                <span className={style.pointDescription}>После заполнения, отчеты формируются в 1 клик. Что может быть лучше?</span>
                            </div>
                        </div>
                    </div>
                </div> 
                <div className={style.footer}>
                    © BSTU.Кураторы 2019. All rights reserved.
                </div>         
            </div>
        );
    }
}

export default WelcomePage;