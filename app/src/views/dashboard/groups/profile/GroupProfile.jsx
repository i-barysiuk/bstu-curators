import React from "react";
import style from "./style.module.scss";
import PageHead from "../../../../components/pageHead/PageHead";
import BigButton from "../../../../components/common/bigButton/BigButton";
import { faPen } from "@fortawesome/free-solid-svg-icons";

export default props => {
  return (
    <div className={style.container}>
      <PageHead
        title="Мелиарация и водное хозяйство - 146"
        subtitle="Факультет Инженерных Сетей и Экологии / Кафедра природоохранной деятельности"
      >
        <BigButton icon={faPen} />
      </PageHead>
    </div>
  );
};
