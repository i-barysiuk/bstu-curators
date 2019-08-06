import React from "react";
import style from "./style.module.scss"
import { Form, Input, Modal, Select, Slider, InputNumber, Button, Switch } from "antd";
const { Option } = Select;
const {TextArea} = Input;


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

function convert(total,value){
  if(total-value < 0) return 0;
  else return total - value;
}

function text(i){
  switch(i){
  case 0:
    return (
    <div>
    <h2>Дети-сироты</h2>
    <h3>(до 18 лет)</h3>
    </div>
    );
  case 1:
    return (
    <div>
    <h2>Дети, оставшиеся без попечения родителей</h2>
    <h3>(до 18 лет)</h3>
    </div>
    );
  case 2:
    return (
    <div>
    <h2>Дети, оставшиеся без попечения родителей</h2>
    <h3>(до 18 лет)</h3>
    </div>
    );
  case 3:
    return (
    <div>
    <h2>Лица из числа детей - сирот и детей, оставшихся без попечения родителей</h2>
    <h3>(18-23 лет)</h3>
    </div>
    );
  case 4:
    return (<h2>Студенты с особенностями психофизического развития</h2>);
  case 5:
    return (<h2>Имеющие родителей инвалидов 1, 2 группы</h2>);
  case 6:
    return (<h2>Из регионов пострадавших от катастрофы на Чернобыльской АЭС</h2>);
  case 7:
    return (<h2>Из семей, отселенных из зон радиоактивного загрязнения</h2>);
  }
}

class Group extends React.Component {
  state = {
    modalVisible: false,
    total: 1,
    women: 0,
    men: 0,
    parent: 0, 
    hostel: 0, 
    relative: 0, 
    privat: 0,
    expand: false,

  };

  setModalVisible(modalVisible) {
    this.setState({ modalVisible, expand: false });
  }

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

  onParentChange = value => {
    this.setState({
      parent: value,
    });
  };

  onHostelChange = value => {
    this.setState({
      hostel: value,
    });
  };

  onRelativeChange = value => {
    this.setState({
      relative: value,
    });
  };

  onPrivateChange = value => {
    this.setState({
      private: value,
    });
  };

   getSocial() {
    const count = this.state.expand ? 8 : 0;
    const { getFieldDecorator } = this.props.form;
    const children = [];
    for (let i = 0; i < count; i++) {
      children.push(
          <Form.Item
          style={{marginLeft: 30}}
          >
            {text(i)}
            {getFieldDecorator(`field-${i}`, {
            })(
              <InputNumber 
                className={style.border}
                min={0}
                max={40}
                placeholder="0" 
            />)
            }
          </Form.Item>
      );
    }
    return children;
  }

  toggle = () => {
    const { expand } = this.state;
    this.setState({ expand: !expand });
  };


  render() {
    const { total, women, men } = this.state;
    const { parent, hostel, relative, privat } = this.state;
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


            <div className={style.container}>
            <h2>Название группы: </h2>
                <Input
                className={style.border}
                placeholder="Группа" 
                />
            </div>


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
                    <InputNumber
                      min={0}
                      className={style.border}
                      style={{ width: '100%' }}
                    />
                </div>
              </div>
            </div>
            

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
            </div>


            <div className = {style.container}>
            <h2>Из них:</h2>
              <div className={style.row}>
                <div className={style.colunm}>
                  <h2>Девушек</h2>    <br/>
                  <h2>Юношей</h2>
                </div>
                <div className={style.colunm}>
                <div className={style.sliderBox}>
                <div className={style.row}>
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
              </div>
            </div> 

            
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


            <div className={style.padding}>
            <div className={style.container}>
            <div className={style.row}>
            <h2
            style={{marginLeft: 0}}
            >Социальный статус</h2>
              <Switch 
              onChange={this.toggle} 
              />
              </div>
              <div className={style.column}>
              {this.getSocial()}
              </div>
            </div>
            </div>


            <div className={style.padding}>
            <div className = {style.column}>
            <h2>Состав семей:</h2>
              <div className={style.row}>
                <div className={style.colunm}>
                  <h2>Стандартная</h2>  <br/>
                  <h2>Многодетная</h2>  <br/>
                  <h2>Неполная</h2>
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
            </div>
            

            <div className={style.container}>
            <div className = {style.column}>
            <h2>Проживают:</h2>
              <div className={style.row}>
                <div className={style.colunm}>
                  <h2>С родителями</h2>    <br/>
                  <h2>В общежитии</h2>     <br/>
                  <h2>У родственников</h2> <br/>
                  <h2>На частной квартире</h2>
                </div>
                <div className={style.colunm}>
                  <div className={style.sliderBox}>
                  <div className={style.row}>
                    <Slider
                      min={0}
                      max= {total}
                      onChange={this.onParentChange}
                      value={typeof parent === 'number' ? parent : 0}
                    />
                    <InputNumber
                      className={style.border}
                      min={0}
                      max={total}
                      style={{ marginLeft: 16 }}
                      value={parent}
                      onChange={this.onParentChange}
                    />
                  </div>
                </div>
                  <br/>
                  <div className={style.sliderBox}>
                  <div className={style.row}>
                    <Slider
                      min={0}
                      max= {total}
                      onChange={this.onHostelChange}
                      value={typeof hostel === 'number' ? hostel : 0}
                    />
                    <InputNumber
                      className={style.border}
                      min={0}
                      max={total}
                      style={{ marginLeft: 16 }}
                      value={hostel}
                      onChange={this.onHostelChange}
                    />
                  </div>
                  </div>
                  <br/>
                  <div className={style.sliderBox}>
                  <div className={style.row}>
                    <Slider
                      min={0}
                      max= {total}
                      onChange={this.onRelativeChange}
                      value={typeof this.relative === 'number' ? relative : 0}
                    />
                    <InputNumber
                      className={style.border}
                      min={0}
                      max={total}
                      style={{ marginLeft: 16 }}
                      value={relative}
                      onChange={this.onRelativeChange}
                    />
                  </div>
                  </div>
                  <br/>
                  <div className={style.sliderBox}>
                  <div className={style.row}>
                    <Slider
                      min={0}
                      max= {total}
                      onChange={this.onPrivateChange}
                      value={typeof privat === 'number' ? privat : 0}
                    />
                    <InputNumber
                      className={style.border}
                      min={0}
                      max={total}
                      style={{ marginLeft: 16 }}
                      value={privat}
                      onChange={this.onPrivateChange}
                    />
                  </div>
                  </div>
                </div>
              </div>
            </div>   
            </div>

            <div className={style.padding}>
              <h2>Другие сведения</h2>
              <TextArea 
                className={style.border}
                style={{height:120}}
                />
            </div>
          </Form>
        </Modal>
        </div>
    );
  }
}

const WrappedGroup = Form.create({ name: "group" })(Group);

export default WrappedGroup;