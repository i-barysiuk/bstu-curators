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
           <div className={style.column}>
            <div>
              <h2>Куратор: </h2>
                <Input 
                style={{ width: 400 }} 
                placeholder="ФИО"
                />
              </div>
              <div style={{marginLeft: 80}}>
                <h2>Телефон куратора: </h2>
                <div className={style.column}>
                  <p>+375</p>
                    <Input
                      style={{ width: 350 }}
                      placeholder="1234567"
                    />
                </div>
              </div>
            </div>
    )
  }
}

class SliderSync extends React.Component{
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onChange(e.target.value);
  }

  render() {
    const total = this.props.total;
    const women = this.props.women;
    const men = this.props.men;
    return (
          <div className={style.row}>
          <h2>Количество человек</h2>
            <div className={style.column}>
              <Slider
                min={1}
                max={40}
                onChange={this.handleChange}
                total={typeof total === 'number' ? total : 0}
                style={{width: 300}}
              />
              <InputNumber
                min={1}
                max={40}
                style={{ marginLeft: 16 }}
                totalValue={total}
                onChange={this.handleChange}
                placeholder = '0'
              />
          </div>
          <h2>Из них:</h2>
          <h2>- Девушек</h2>
          <div className={style.column}>
              <Slider
                min={0}
                max={40}
                onChange={this.handleChange}
                womenValue={typeof women === 'number' ? women : 0}
                style={{width: 300}}
              />
              <InputNumber
                min={0}
                max={40}
                style={{ marginLeft: 16 }}
                womenValue={women}
                onChange={this.handleChange}
                placeholder = '0'
              />
            </div>
            <h2>- Юношей</h2>
            <div className={style.column}>
              <Slider
                min={0}
                max={40}
                onChange={this.handleChange}
                menValue={typeof men === 'number' ? men : 0}
                style={{width: 300}}
              />
              <InputNumber
                min={0}
                max={40}
                style={{ marginLeft: 16 }}
                menValue={men}
                onChange={this.handleChange}
                placeholder = '0'
              />
              </div>
        </div>
    );
  }
}

class Organisation extends React.Component{
  render(){
    return(
          <div className={style.column}>
            <div className={style.row}>
              <h3>- БРСМ</h3>
              <h3>- Профком</h3>
              <h3>- Прочее</h3> 
            </div>
            <div className={style.row}>
              <div>
              <InputNumber
                  min={1}
                  max={40}
                  style={{ marginLeft: 50 }}
                  placeholder = '0'
                />
                </div>
                <div>
                 <InputNumber
                  min={1}
                  max={40}
                  style={{ marginLeft: 50 }}
                  placeholder = '0'
                />
                </div>
                <div>
                <InputNumber
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

class Margin extends React.Component{
  render(){
  return (
    <div>
    <br/>
    <br/>
    </div>
    );
  }
}

class Group extends React.Component {
  constructor(props) {
    super(props);
    this.handleTotalChange = this.handleTotalChange.bind(this);
  }

  handleTotalChange(value) {
    this.setState({value});
  }

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
          width = '1024px'
          centered
          closable = {false}
          destroyOnClose = {true}
          footer = {
            <Button
              type="primary"
              onClick={() => this.setModalVisible(false)}
              >
              Отправить
            </Button>
          }
          visible={this.state.modalVisible}
        >
          <Form>
            <Faculty/>
            <Margin/>
            <GroupName/>
            <Margin/>
            <Curator/>
            <Margin/>
            <SliderSync/>
            <Margin/>
            <Organisation/> 
          </Form>
        </Modal>
        </div>
    );
  }
}

export default Group;