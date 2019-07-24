import React from "react";
import { Button, Carousel, Icon} from "antd";
import "./style.css";
import style from "./style.module.scss";
import logo from "../../assets/images/logos/logo.png";

class Tips extends React.Component {
    render()
    {return (
    
        <div className={style.bar}>
          <div className={style.logoAndCarousel}>
            <img src={logo} className={style.logo} alt="logo" />
            <Carousel autoplay>
              <div>
                <span>Test 1</span>
              </div>
              <div>
                <span>Test 2</span>
              </div>
              <div>
                <span>Test 3</span>
               </div>
              <div>
                <span>Что-то прекрасное о вузе</span>
              </div>
            </Carousel>
          </div>
          <div className={style.buttons}>
          <Button type="primary" href="#">
            <Icon type="left" />
              На главную
          </Button>
          <Button type="primary" size={"medium"} href="#">
            Помощь
          </Button>
          </div>
        </div>
     );
    }
}
export default Tips;
