import React from "react";
import style from "./style.module.scss";
import logo from "../../assets/images/logos/welcomelogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUserEdit,
    faDoorOpen,
    faClock,
    faThumbsUp,
    faCookieBite,
    faCheck,
    faTachometerAlt,
    faMobile,
    faEye,
    faMoneyBill,
    faBolt

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
                        <span className={style.helperText}>BSTU.Кураторы - онлайн помощник, <br/>чтобы ничего не упустить.</span>
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
                                <span className={style.pointHeadline}>Удобно <FontAwesomeIcon className={style.icons2} icon={faCookieBite} /> </span>
                                <span className={style.pointDescription}>После заполнения, отчеты формируются в 1 клик. Что может быть лучше?</span>
                            </div>
                        </div>
                    </div>

                    <span className={style.mainDescription}>Онлайн приложение для помощи куратору в ведении своей группы, а также заполнения отчетов и планов.</span>
                    <div className={style.screensOfApp}>
                        <div className={style.firstScreens}>
                            <img src={require('../../assets/images/screens/1.jpg') } className={style.screens} alt="screen"/>
                            <img src={require('../../assets/images/screens/3.jpg')} className={style.screens} alt="screen"/>
                        </div>
                        <div className={style.secondScreens}>
                            <img src={require('../../assets/images/screens/4.jpg')} className={style.screens} alt="screen"/>
                            <img src={require('../../assets/images/screens/2.jpg')} className={style.screens} alt="screen"/>
                        </div>
                    </div>

                    <div className={style.whyWe}>
                        <div className={style.everLine2}>Почему именно это приложение?</div>
                        <div className={style.reasons}>
                            <div className={style.reason}>
                                <span className={style.everLine}>Скорость <FontAwesomeIcon className={style.icons2} icon={faTachometerAlt} /></span>
                                <div className={style.description}>Быстрое заполнение онлайн, а не от руки, что существенно сыкономит время</div>
                                <img src={require('../../assets/images/screens/notebook.png') } className={style.screens} alt="screen"/>
                            </div>
                    
                            <div className={style.reason}>
                                <span className={style.everLine}>Мобильность <FontAwesomeIcon className={style.icons2} icon={faMobile} /></span>
                                <div className={style.description}>Возможность заполнения как при помощи компьютера, так и при помощи сматрфона</div>
                                <img src={require('../../assets/images/screens/phone.png') } className={style.screens} alt="screen"/>
                            </div>
                        </div>
                        <div className={style.reasons}>
                            <div className={style.reason}>
                                <span className={style.everLine}>Без скачиваний <FontAwesomeIcon className={style.icons2} icon={faBolt} /></span>
                                <div className={style.description}>Больше ничего не нужно скачивать. Просто используйте свой любимый браузер</div>
                                <img src={require('../../assets/images/screens/browsers.png') } className={style.screens} alt="screen"/>
                            </div>
                    
                            <div className={style.reason}>
                                <span className={style.everLine}>For free <FontAwesomeIcon className={style.icons2} icon={faMoneyBill} /></span>
                                <div className={style.description}>Бесплатное использование всего функционала без ограничений</div>
                                <img src={require('../../assets/images/screens/forfree.png') } className={style.screens} alt="screen"/>
                            </div>
                        </div>
                        <div className={style.reasons}>
                            <div className={style.lastReason}>
                                <span className={style.everLine}>Прогрессивность <FontAwesomeIcon className={style.icons2} icon={faEye} /></span>
                                <div className={style.description}>Мы всегда следим за пользователями, чтобы сделать приложение еще лучше</div>
                                <img src={require('../../assets/images/screens/space.png') } className={style.screens} alt="screen"/>
                            </div>
                        </div>
                    </div>

                    <div className={style.whatCanWeDo}>
                        <div className={style.bar}>
                        </div>
                        <div className={style.whatCanList}>
                            <span className={style.headline2}>Что Вы можете делать с этим приложением?</span>
        
                            <ul>
                                <li><FontAwesomeIcon className={style.icons2} icon={faCheck} /> Отслеживать информацию об успеваимости студентов</li>
                                <li><FontAwesomeIcon className={style.icons2} icon={faCheck} /> Проверять и отслеживать активность студентов в течении всего периода</li>
                                <li><FontAwesomeIcon className={style.icons2} icon={faCheck} /> Следить за посещаемостью студентов</li>
                                <li><FontAwesomeIcon className={style.icons2} icon={faCheck} />  Вести и записывать всю проведенную индивидуальную работу со студентами</li>
                                <li><FontAwesomeIcon className={style.icons2} icon={faCheck} /> В любой момент найти контакты нужного студента</li>
                                <li><FontAwesomeIcon className={style.icons2} icon={faCheck} /> Легко и просто заполнить весь журнал</li>
                            </ul>
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