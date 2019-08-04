import React from "react";
import style from "./style.module.scss"
import { Form, Input, Modal, Select, Slider, InputNumber, Button } from "antd";
const { Option } = Select;


function onChange(value) {
  console.log(`selected ${value}`);
}

function onBlur() {
  console.log('blur');
}

function onFocus() {
  console.log('focus');
}

function onSearch(val) {
  console.log('search:', val);
}

class Faculty extends React.Component{
render() {
  return (
        <div className={style.container}>
        <div className={style.select}>
        <h2>Факультет:</h2>
          <Select
            className = {style.border}
            dropdownClassName = {style.border}
            autoFocus
            showSearch
            placeholder="Факультет:"
            optionFilterProp="children"
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            onSearch={onSearch}
            filterOption={(input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            >
            <Option value="ФЭИС">ФЭИС</Option>
            <Option value="ФИСЭ">ФИСЭ</Option>
            <Option value="СФ">СФ</Option>
            <Option value="ЭФ">ЭФ</Option>
            <Option value="МСФ">МСФ</Option>
          </Select>
          </div>
          </div>
  );
  }
}

class GroupName extends React.Component{
  render(){
    return (
      <div className={style.container}>
      <h2>Название группы: </h2>
          <Input 
          className={style.border}
          placeholder="Группа" 
          />
      </div>
    );
  }
}

class Curator extends React.Component{
  render(){
    return(
           <div className={style.flex}>
            <div className={style.container}>
              <h2>Куратор: </h2>
                <Input 
                className={style.border}
                placeholder="ФИО"
                />
              </div>
              <div 
              className={style.container}
              >
                <h2>Телефон куратора: </h2>
                <div className={style.row}>
                  <p className={style.phone}>+375</p>
                    <Input
                      className={style.border}
                    />
                </div>
              </div>
            </div>
    )
  }
}

function convert(total,value){
  if(total-value < 0) return 0;
  else return total - value;
}

class SliderSync extends React.Component {
  state = {
    total: 1,
    women: 0,
    men: 0,
  };

  onTotalChange = value => {
    this.setState({
      total: value,
    });
  };

  onWomenChange = value => {
    this.setState({
      women: value,
    });
  };

  onMenChange = value => {
    this.setState({
      men: value,
    });
  };

  render() {
    const { total } = this.state;
    const { women } = this.state;
    const { men } = this.state;
    return (
          <div className={style.colunm}>
          <h2>Количество человек</h2>
          <div className={style.sliderBox}>
            <div className={style.row}>
            <Slider
            min={1}
            max={40}
            onChange={this.onTotalChange}
            value={typeof total === 'number' ? total : 0}
          />
          <InputNumber
            className={style.border}
            min={1}
            max={40}
            style={{ marginLeft: 16 }}
            value={total}
            onChange={this.onTotalChange}
          />
          </div>
          </div>
            <h2>Из них:</h2>
            <div className={style.sliderBox}>
            <div className={style.row}>
            <h2>Девушек</h2>
            <Slider
            min={0}
            max= {convert(total,men)}
            onChange={this.onWomenChange}
            value={typeof women === 'number' ? women : 0}
            />
            <InputNumber
              className={style.border}
              min={0}
              max={convert(total,men)}
              style={{ marginLeft: 16 }}
              value={women}
              onChange={this.onWomenChange}
            />
            </div>
            </div>
            <div className={style.sliderBox}>
            <div className={style.row}>
            <h2>Юношей</h2>
            <Slider
            min={0}
            max={convert(total,women)}
            onChange={this.onMenChange}
            value={typeof men === 'number' ? men : 0}
            />
            <InputNumber
              className={style.border}
              min={0}
              max={convert(total,women)}
              style={{ marginLeft: 16 }}
              value={men}
              onChange={this.onMenChange}
            />
            </div>
            </div>
        </div>
    );
  }
}

class Organisation extends React.Component{
  render(){
    return(
          <div className = {style.container}>
          <div className={style.row}>
            <div className={style.colunm}>
              <h2>БРСМ</h2>    <br/>
              <h2>Профком</h2> <br/>
              <h2>Прочее</h2>
            </div>
            <div className={style.colunm}>
              <div className={style.otherBox}>
              <InputNumber
                  className={style.border}
                  min={1}
                  max={40}
                  placeholder = '0'
                />
                </div>
                <br/>
                <div className={style.otherBox}>
                 <InputNumber
                  className={style.border}
                  min={1}
                  max={40}
                  placeholder = '0'
                />
                </div>
                <br/>
                <div className={style.otherBox}>
                <InputNumber
                  className={style.border}
                  min={1}
                  max={40}
                  placeholder = '0'
                />
                </div>
            </div>
          </div>
          </div>    
    )
  }
}

class Group extends React.Component {
  state = {
    modalVisible: false
  };

  setModalVisible(modalVisible) {
    this.setState({ modalVisible });
  }

  render() {
    return (
      <div>
      
      <Button
      onClick={() => this.setModalVisible(true)}
      >
      Group Modal
      </Button>

        <Modal
          title = "Добавление группы"
          width = 'none'
          centered
          destroyOnClose = {true}
          footer = {
            <div className={style.row}>
            <h3>Поля, отмеченные * обязательны для заполнения</h3>
            <Button
              className={style.footerButton}
              type="primary"
              onClick={() => this.setModalVisible(false)}
              >
              Отправить
            </Button>
            </div>
          }
          onCancel={() => this.setModalVisible(false)}
          visible={this.state.modalVisible}
        >
          <Form>
            <Faculty/>
            <GroupName/>
            <Curator/>
            <SliderSync/>
            <Organisation/> 
          </Form>
        </Modal>
        </div>
    );
  }
}

export default Group;