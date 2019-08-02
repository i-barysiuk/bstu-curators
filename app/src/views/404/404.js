import React from "react";
import style from "./style.module.scss";
import { Button } from "antd";

class NotFound extends React.Component {
  render() 
  {
    return(
        <div className={style.container}>
          <div className={style.massage}>  
            <div className={style.number}>#404</div>
            <div className={style.oops}>УУУПС!</div>
            <div className={style.text}>
              Мы не можем найти эту страницу, зато мы нашли студента,
              который прогулял вашу пару :)
            </div>
            <div className={style.buttons}>
            <Button 
              type="default" 
              shape="round" 
              icon="left"
              size="large"
              className={style.button}
              onClick={this.props.history.goBack}
              >
                Назад     
              </Button>
            <Button
                type="default"
                shape="round"
                icon="home"
                size="large"
                className={style.button}
                onClick={() => this.props.history.push("/")}
              >
                Главная
              </Button>
            </div>
          </div>
        </div>          
    );
  }
}

export default NotFound;