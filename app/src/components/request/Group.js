import React from "react";
import style from "./style.module.scss"
import { Form, Input, Modal, Select, Slider, InputNumber, Button, Switch, Steps } from "antd";
const { Option } = Select;
const {TextArea} = Input;
const { Step } = Steps;


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

function sum(arg1,arg2,arg3) {return arg1 + arg2 + arg3;}

function convert(total,value){
  if(total-value < 0) return 0;
  else return total - value;
}

function text(i){
  switch(i){
  case 0:
    return (
    <div>
    <h3>Дети-сироты</h3>
    <h3>(до 18 лет)</h3>
    </div>
    );
  case 1:
    return (
    <div>
    <h3>Дети, оставшиеся без попечения родителей</h3>
    <h3>(до 18 лет)</h3>
    </div>
    );
  case 2:
    return (
    <div>
    <h3>Дети, оставшиеся без попечения родителей</h3>
    <h3>(до 18 лет)</h3>
    </div>
    );
  case 3:
    return (
    <div>
    <h3>Лица из числа детей - сирот и детей, оставшихся без попечения родителей</h3>
    <h3>(18-23 лет)</h3>
    </div>
    );
  case 4:
    return (<h3>Студенты с особенностями психофизического развития</h3>);
  case 5:
    return (<h3>Имеющие родителей инвалидов 1, 2 группы</h3>);
  case 6:
    return (<h3>Из регионов пострадавших от катастрофы на Чернобыльской АЭС</h3>);
  case 7:
    return (<h3>Из семей, отселенных из зон радиоактивного загрязнения</h3>);
  }
}

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class Group extends React.Component {
  state = {
    modalVisible: false,
    current: 0,
    
    total: 1,
    women: 0,
    men: 0,

    standart:0,
    large:0,
    incomplete:0,

    parent: 0, 
    hostel: 0, 
    relative: 0, 
    privat: 0,
  };

  setModalVisible(modalVisible) {
    this.setState({ modalVisible, current: 0 });
  }

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
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
      privat: value,
    });
  };

  onStandartChange = value => {
    this.setState({
      standart: value,
    });
  };

  onLargeChange = value => {
    this.setState({
      large: value,
    });
  };

  onIncompleteChange = value => {
    this.setState({
      incomplete: value,
    });
  };

   getSocial(column) {
    const first = column ? 1 : 0;
    const { getFieldDecorator } = this.props.form;
    const children = [];
    for (let i = first; i < 8; i+=2) {
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

  render() {
    const { current } = this.state;
    const { total, women, men } = this.state;
    const { standart, large, incomplete } = this.state;
    const { parent, hostel, relative, privat } = this.state;
    const { getFieldDecorator, getFieldsError } = this.props.form;

    const steps = [
      {
        content: (
        <div>
        <div className={style.container}>
        <div className={style.select}>
        <Form.Item>
        <h2>Факультет:</h2>
        {getFieldDecorator('faculty', {
            validateFirst: true,
            rules: [
              {
                required: true,
                message: "Пожалуйста выберите факультет"
              },
            ],
            validateTrigger: "onBlur"
          })(
          <Select
            className = {style.border}
            dropdownClassName = {style.border}
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
          </Select>)
          }
          </Form.Item>
          </div>
          </div>
          

          <div className={style.container}>
          <Form.Item>
          <h2>Название группы: </h2>
          {getFieldDecorator(`group`, {
            rules: [
              {
                required: true,
                message: "Пожалуйста укажите название группы"
              },
            ],
            validateTrigger: "onBlur" 
          })(
              <Input
              className={style.border}
              placeholder="Группа" 
              />)
          }
          </Form.Item>
          </div>

          
          <div className={style.flex}>
          <div className={style.container}> 
            <h2>Куратор: </h2>
            <Form.Item>
            {getFieldDecorator('curator', {
            rules: [
              {
                required: true,
                message: "Пожалуйста укажите ФИО"
              },
            ],
            validateTrigger: "onBlur" 
            })(
              <Input 
              className={style.border}
              placeholder="ФИО"
              />)
            }
            </Form.Item>
            </div>
            <div 
            className={style.container}>
              <h2>Телефон куратора: </h2>
              <Form.Item>
              <div className={style.row}>
                <p className={style.phone}>+375</p>
                  <InputNumber
                    min={0}
                    className={style.border}
                    style={{ width: '100%' }}
                  />
              </div>
              </Form.Item>
            </div>
          </div>
          

          
          <div className={style.colunm}>
          <Form.Item>
            <h2>Количество человек</h2>
            <div className={style.sliderBox}>
              <div className={style.row}>
              {getFieldDecorator('total', {
                validateFirst: true,
                rules: [
              {
                required: true,
                message: "Пожалуйста укажите количество человек"
              },
              { validator: this.checkSlider }
              ],
              validateTrigger: "onBlur" 
              })(
                <Slider
                  min={1}
                  max={40}
                  onChange={this.onTotalChange}
                  value={typeof total === 'number' ? total : 0}
                />)
              }
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
              </Form.Item>
          </div>

          
          <div>
          <h2>Из них:</h2>
            <div className={style.row}>
              <div className={style.colunm}>
                <h2>Девушек</h2>    <br/>
                <h2>Юношей</h2>
              </div>
              <div className={style.colunm}>
              <Form.Item>
              <div className={style.sliderBox}>
              <div className={style.row}>
              {getFieldDecorator('sex-w', {
                rules: [
                  {
                    required: true,
                    message: "Не все участники группы распределены"
                  },
                ],
                validateTrigger: "onBlur" 
                })(
                <Slider
                  min={0}
                  max= {convert(total,men)}
                  onChange={this.onWomenChange}
                  value={typeof women === 'number' ? women : 0}
                />)
                }
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
              </Form.Item>
                <div className={style.sliderBox}>
              <Form.Item>
              <div className={style.row}>
              {getFieldDecorator('sex-m', {
                rules: [
                  {
                    required: true,
                    message: "Не все участники группы распределены"
                  },
                ],
                validateTrigger: "onBlur" 
                })(
                <Slider
                  min={0}
                  max={convert(total,women)}
                  onChange={this.onMenChange}
                  value={typeof men === 'number' ? men : 0}
                />)
                }
                <InputNumber
                  className={style.border}
                  min={0}
                  max={convert(total,women)}
                  style={{ marginLeft: 16 }}
                  value={men}
                  onChange={this.onMenChange}
                />
              </div>
              </Form.Item>
            </div>
              </div>
            </div>
          </div>
          </div>
            )
      },
      {
        content: (
          <div>
          <h2>Нахождение студентов в различных объединениях, сообществах и т.д.</h2>
          <div className = {style.container}>
          <div className={style.row}>
            <div className={style.colunm}>
              <h3>БРСМ</h3>    <br/>
              <h3>Профком</h3> <br/>
              <h3>Прочее</h3>
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
        )
      },
      {
        content: (
          <div className={style.padding}>
            <div className={style.row}>
            <h2
            style={{marginLeft: 0}}
            >Социальный статус</h2>
              </div>
              <div className={style.row}>
              <div className={style.column}>
              {this.getSocial(0)}
              </div>
              <div className={style.column}>
              {this.getSocial(1)}
              </div>
              </div>
            </div>
        )
      },
      {
        content: (
          <div>
          <div className={style.padding}>
            <div className = {style.column}>
            <h2>Состав семей:</h2>
              <div className={style.row}>
                <div className={style.colunm}>
                  <h3>Стандартная</h3>  <br/>
                  <h3>Многодетная</h3>  <br/>
                  <h3>Неполная</h3>
                </div>
                <div className={style.colunm}>
                <div className={style.otherBox}>
                <Form.Item>
                {getFieldDecorator('standart', {
                  validateFirst: true,
                  rules: [
                    {
                      required: true,
                      message: "Пожалуйста заполните это поле"
                    },
                  ],
                  validateTrigger: "onBlur" 
                  })(
                    <InputNumber
                        className={style.border}
                        min={1}
                        max={convert(total,sum(large,incomplete))}
                        placeholder = '0'
                        value={standart}
                        onChange={this.onStandartChange}
                      />)
                  }
                  </Form.Item>
                  </div>
                  <br/>
                  <div className={style.otherBox}>
                  <Form.Item>
                  {getFieldDecorator('large', {
                    validateFirst: true,
                    rules: [
                      {
                        required: true,
                        message: "Пожалуйста заполните это поле"
                      },
                    ],
                    validateTrigger: "onBlur" 
                    })(
                    <InputNumber
                      className={style.border}
                      min={1}
                      max={convert(total,sum(standart,incomplete))}
                      placeholder = '0'
                      value={large}
                      onChange={this.onLargeChange}
                    />)
                  }
                  </Form.Item>
                  </div>
                  <br/>
                  <div className={style.otherBox}>
                  <Form.Item>
                  {getFieldDecorator('incompl', {
                    validateFirst: true,
                    rules: [
                      {
                        required: true,
                        message: "Пожалуйста заполните это поле"
                      },
                    ],
                    validateTrigger: "onBlur" 
                    })(
                    <InputNumber
                      className={style.border}
                      min={1}
                      max={convert(total,sum(standart,large))}
                      placeholder = '0'
                      value={incomplete}
                      onChange={this.onIncompleteChange}
                    />)
                  }
                  </Form.Item>
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
                  <h3>С родителями</h3>    <br/>
                  <h3>В общежитии</h3>     <br/>
                  <h3>У родственников</h3> <br/>
                  <h3>На частной квартире</h3>
                </div>
                <div className={style.colunm}>
                  <div className={style.sliderBox}>
                  <Form.Item>
                  <div className={style.row}>
                  {getFieldDecorator('parent', {
                  validateFirst: true,
                  rules: [
                    {
                      required: true,
                      message: "Не все участники группы распределены"
                    },
                  ],
                  validateTrigger: "onBlur" 
                  })(
                    <Slider
                      min={0}
                      max= {convert(total,sum(hostel,relative,privat))}
                      onChange={this.onParentChange}
                      value={typeof parent === 'number' ? parent : 0}
                    />)
                    }
                    <InputNumber
                      className={style.border}
                      min={0}
                      max={convert(total,sum(hostel,relative,privat))}
                      style={{ marginLeft: 16 }}
                      value={parent}
                      onChange={this.onParentChange}
                    />
                  </div>
                  </Form.Item>
                </div>
                  <br/>
                  <div className={style.sliderBox}>
                  <Form.Item>
                  <div className={style.row}>
                    {getFieldDecorator('hostel', {
                    validateFirst: true,
                    rules: [
                      {
                        required: true,
                        message: "Не все участники группы распределены"
                      },
                    ],
                    validateTrigger: "onBlur" 
                    })(
                    <Slider
                      min={0}
                      max= {convert(total,sum(parent,relative,privat))}
                      onChange={this.onHostelChange}
                      value={typeof hostel === 'number' ? hostel : 0}
                    />)
                    }
                    <InputNumber
                      className={style.border}
                      min={0}
                      max={convert(total,sum(parent,relative,privat))}
                      style={{ marginLeft: 16 }}
                      value={hostel}
                      onChange={this.onHostelChange}
                    />
                  </div>
                  </Form.Item>
                  </div>
                  <br/>
                  <div className={style.sliderBox}>
                  <Form.Item>
                  <div className={style.row}>
                    {getFieldDecorator('relative', {
                    validateFirst: true,
                    rules: [
                      {
                        required: true,
                        message: "Не все участники группы распределены"
                      },
                    ],
                    validateTrigger: "onBlur" 
                    })(
                    <Slider
                      min={0}
                      max= {convert(total,sum(parent,hostel,privat))}
                      onChange={this.onRelativeChange}
                      value={typeof this.relative === 'number' ? relative : 0}
                    />)
                    }
                    <InputNumber
                      className={style.border}
                      min={0}
                      max={convert(total,sum(parent,hostel,privat))}
                      style={{ marginLeft: 16 }}
                      value={relative}
                      onChange={this.onRelativeChange}
                    />
                  </div>
                  </Form.Item>
                  </div>
                  <br/>
                  <div className={style.sliderBox}>
                  <Form.Item>
                  <div className={style.row}>
                    {getFieldDecorator('private', {
                    validateFirst: true,
                    rules: [
                      {
                        required: true,
                        message: "Не все участники группы распределены"
                      },
                    ],
                    validateTrigger: "onBlur" 
                    })(
                    <Slider
                      min={0}
                      max={convert(total,sum(parent,hostel,relative))}
                      onChange={this.onPrivateChange}
                      value={typeof privat === 'number' ? privat : 0}
                    />)
                    }
                    <InputNumber
                      className={style.border}
                      min={0}
                      max={convert(total,sum(parent,hostel,relative))}
                      style={{ marginLeft: 16 }}
                      value={privat}
                      onChange={this.onPrivateChange}
                    />
                  </div>
                  </Form.Item>
                  </div>
                </div>
              </div>
            </div>   
            </div>
            </div>
        )
      },
      {
        content: (
          <div className={style.padding}>
              <h2>Другие сведения</h2>
              <TextArea 
                className={style.border}
                style={{height:120}}
                />
            </div>
        )
      },
    ]


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
            <div className={style.footerButton}>
            {current > 0 && (
            <Button 
            style={{ width: 100 }}
            className={style.border}
            onClick={() => this.prev()}>
              Назад
            </Button>
          )}
            {current < 4 && (
              <Button 
              type="primary" 
              style={{ width: 100 }}
              className={style.border}
              disabled={hasErrors(getFieldsError())}
              onClick={() => this.next()}>
                Далее
              </Button>
            )}
            {current === 4 && (
              <Button type="primary" 
              style={{ width: 100 }}
              className={style.border}
              onClick={() => this.setModalVisible(false)}>
                Готово
              </Button>
            )}
            </div>
            </div>
          }
          onCancel={() => this.setModalVisible(false)}
          visible={this.state.modalVisible}
        >
          <Form>

          <Steps current={current}>
          {steps.map(item => (
            <Step key={item}/>
          ))}
          </Steps>
          <div className="steps-content">{steps[current].content}</div>

          </Form>
        </Modal>
        </div>
    );
  }
}

const WrappedGroup = Form.create({ name: "group" })(Group);

export default WrappedGroup;