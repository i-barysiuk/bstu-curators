
import React from 'react';
import 'antd/dist/antd.css';
import style from "./style.module.scss";
import { Table, Button, Popover, Icon,} from 'antd';


const data = [
  {
    first_name: 'sadasd`',
    last_name: 'Brown',
    f_name: 'maksimkovich',
    sex: 'man',
    birthday:'15/20/2000',
    phone: '+375298411425',
    email: 'eawfasf@mail.ru',
  },
  {
    first_name: 'maksim',
    last_name: 'Brown',
    f_name: 'maksimkovich',
    sex: 'woman',
    birthday:'15/20/2000',
    phone:"+375298411425",
    email: "eawfasf@mail.ru",
  },
];
const columns = [
  {
    title: 'Имя',
    dataIndex: 'first_name',
  },
  {
    title: 'Фамилия',
    dataIndex: 'last_name',
  },
  {
    title: 'Отчетсво',
    dataIndex: 'f_name',
  },
  {
    title: 'Пол',
    dataIndex: 'sex',
    align: 'center',
    render : () => (
      <Icon type="man" />
    )
    // render: (callback) => {
    //   if(data.email !== 'woman'){
    //     callback(<Icon type="man" />);
    //   }
    //   else {
    //     callback(<Icon type="woman" />);
    //   }
    // }
  },
  {
    title: 'Дата рождения',
    dataIndex: 'birthday',
  },
  {
    title: 'Телефон',
    dataIndex: 'phone',
  },
  {
    title: 'Электронная почта',
    dataIndex: 'email',
    align: 'center',
    render: () => (
      <Popover content={data.email} >
      <Button icon="mail" type="primary"></Button>
    </Popover> 
    )
  },
];
function Table1(){
return(
<div className={style.container}>
 <div className={style.buttonsAndHeadline}>
              <span className={style.headline}>Список студентов</span>   
               <div className={style.Plus}>
                <Button type="primary" icon="plus" className={style.buttonShadow} />    
               </div>
            </div>
            <div className={style.content}>
            <Table
    size="middle"
    columns={columns}
    dataSource={data}
    bordered
  />
  </div>
            </div>

);
}
export default Table1;

     