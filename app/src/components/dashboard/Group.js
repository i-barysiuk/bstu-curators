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
        <div>
        <h2>Факультет:</h2>
          <Select
            className = {style.border}
            dropdownClassName = {style.border}
            showSearch
            style={{ width: 400 }}
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
  );
  }
}

class GroupName extends React.Component{
  render(){
    return (
      <div>
      <h2>Название группы: </h2>
          <Input 
          className={style.border}
          style={{ width: 400 }} 
          placeholder="Группа" 
          />
      </div>
    );
  }
}

class Curator extends React.Component{
  render(){
    return(
           <div className={style.row}>
            <div>
              <h2>Куратор: </h2>
                <Input 
                className={style.border}
                style={{ width: 400 }}
                placeholder="ФИО"
                />
              </div>
              <div style={{marginLeft: 40}}>
                <h2>Телефон куратора: </h2>
                <div className={style.row}>
                  <p className={style.phone}>+375</p>
                    <Input
                      className={style.border}
                      style={{ width: 350 }}
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
    inputValue1: 1,
    inputValue2: 0,
    inputValue3: 0,
  };

  onTotalChange = value => {
    this.setState({
      inputValue1: value,
    });
  };

  onWomenChange = value => {
    this.setState({
      inputValue2: value,
    });
  };

  onMenChange = value => {
    this.setState({
      inputValue3: value,
    });
  };

  render() {
    const { inputValue1 } = this.state;
    const { inputValue2 } = this.state;
    const { inputValue3 } = this.state;
    return (
          <div className={style.colunm}>
          <h2>Количество человек</h2>
            <div className={style.row}>
            <Slider
            min={1}
            max={40}
            onChange={this.onTotalChange}
            value={typeof inputValue1 === 'number' ? inputValue1 : 0}
            style={{width: 300}}
          />
          <InputNumber
            className={style.border}
            min={1}
            max={40}
            style={{ marginLeft: 16 }}
            value={inputValue1}
            onChange={this.onTotalChange}
          />
          </div>
          <h2>Из них:</h2>
          <div className={style.row}>
          <h2 style={{ marginLeft: 50, marginRight: 50 }}>- Девушек</h2>
          <Slider
            min={0}
            max= {convert(inputValue1,inputValue3)}
            onChange={this.onWomenChange}
            value={typeof inputValue2 === 'number' ? inputValue2 : 0}
            style={{width: 300}}
          />
          <InputNumber
            className={style.border}
            min={0}
            max={convert(inputValue1,inputValue3)}
            style={{ marginLeft: 16 }}
            value={inputValue2}
            onChange={this.onWomenChange}
          />
            </div>
            <div className={style.row}>
            <h2 style={{ marginLeft: 50, marginRight: 50 }}>- Юношей</h2>
            <Slider
            min={0}
            max={convert(inputValue1,inputValue2)}
            onChange={this.onMenChange}
            value={typeof inputValue3 === 'number' ? inputValue3 : 0}
            style={{width: 300}}
          />
          <InputNumber
            className={style.border}
            min={0}
            max={convert(inputValue1,inputValue2)}
            style={{ marginLeft: 16 }}
            value={inputValue3}
            onChange={this.onMenChange}
          />
              </div>
        </div>
    );
  }
}

class Organisation extends React.Component{
  render(){
    return(
          <div className={style.row}>
            <div className={style.colunm}>
              <h3>- БРСМ</h3>    <br/>
              <h3>- Профком</h3> <br/>
              <h3>- Прочее</h3>
            </div>
            <div className={style.colunm}>
              <div>
              <InputNumber
                  className={style.border}
                  min={1}
                  max={40}
                  style={{ marginLeft: 50 }}
                  placeholder = '0'
                />
                </div>
                <br/>
                <div>
                 <InputNumber
                  className={style.border}
                  min={1}
                  max={40}
                  style={{ marginLeft: 50 }}
                  placeholder = '0'
                />
                </div>
                <br/>
                <div>
                <InputNumber
                  className={style.border}
                  min={1}
                  max={40}
                  style={{ marginLeft: 50 }}
                  placeholder = '0'
                />
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
          width = '925px'
          centered
          destroyOnClose = {true}
          footer = {
            <div className={style.row}>
            <h3>Поля, отмеченные * обязательны для заполнения</h3>
            <Button
              style = {{marginLeft: 385}}
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
            <br/>
            <GroupName/>
            <br/>
            <Curator/>
            <br/>
            <SliderSync/>
            <br/>
            <Organisation/> 
          </Form>
        </Modal>
        </div>
    );
  }
}

export default Group;