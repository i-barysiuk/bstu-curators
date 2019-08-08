import React from "react";
import style from "./style.module.scss"
import { Form, Input, Modal, Select, Slider, InputNumber, Button, Steps, Tabs } from "antd";
const { Option } = Select;
const {TextArea} = Input;
const { Step } = Steps;
const { TabPane } = Tabs;


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

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

const text = [
  {fieldText: "Дети-сироты", note: "(до 18 лет)"},
  {fieldText: "Дети, оставшиеся без попечения родителей", note: "(до 18 лет)"},
  {fieldText: "Дети, оставшиеся без попечения родителей", note: "(до 18 лет)"},
  {fieldText: "Лица из числа детей-сирот и детей, оставшихся без попечения родителей", note: "(18-23 лет)"},
  {fieldText: "Студенты с особенностями психофизического развития"},
  {fieldText: "Имеющие родителей инвалидов 1, 2 группы"},
  {fieldText: "Из регионов пострадавших от катастрофы на Чернобыльской АЭС"},
  {fieldText: "Из семей, отселенных из зон радиоактивного загрязнения"}
]

class Group extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      current:0,

      faculty: '',
      group: '',
      curator: '',
      phone: '',

      total:1,
      women:0,
      men:0,

      brsm: 0,
      profcom: 0,
      other: 0,

      //здесь должен быть соц статус

      standart:0,
      large:0,
      incomplete:0,

      parent:0, 
      hostel:0, 
      relative:0,
      privat:0,

      more: '',
    };
  }

  setModalVisible(modalVisible) {
    this.setState({ modalVisible, current: 0 });
  }

  next() {
    const fields = [
      {fieldList: ['faculty','group','curator']},//,'sex-w','sex-m'
      {fieldList: ['brsm','profcom','other']},
      {fieldList: [`social-0`,`social-1`,`social-2`,`social-3`,`social-4`,`social-5`,`social-6`,`social-7`,`social-8`]},
      {fieldList: ['standart','large','incomplete']},//,'parent','hostel','relative','private'
      {fieldList: ['more']},
    ]
    this.props.form.validateFieldsAndScroll(
     fields[this.state.current].fieldList,
      (err,values) => {
      if(!err)
      {
        const current = this.state.current + 1;
        this.setState({ current });
      }
  })
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  onFacultyChange = value => {this.setState({faculty: value,}, console.log(`selected ${value}`))};
  onGroupChange = value => {this.setState({group: value,})};
  onCuratorChange = value => {this.setState({curator: value,})};
  onPhoneChange = value => {this.setState({phone: value,})};

  onTotalChange = value => {this.setState({total: value,})};
  onWomenChange = value => {this.setState({women: value,})};
  onMenChange = value => {this.setState({men: value,})};

  onParentChange = value => {this.setState({parent: value,})};
  onHostelChange = value => {this.setState({hostel: value,})};
  onRelativeChange = value => {this.setState({relative: value,})};
  onPrivateChange = value => {this.setState({privat: value,})};

  onStandartChange = value => {this.setState({standart: value,})};
  onLargeChange = value => {this.setState({large: value,})};
  onIncompleteChange = value => {this.setState({incomplete: value,})};
  
  getOrganisation() {
    const fieldName = [ 'brsm','profcom','other' ];
    const fieldText = [ 'БРСМ', 'Профком', 'Прочее'];
    const { getFieldDecorator } = this.props.form;
    const children = [];
    for (let i = 0; i < 3; i++) {
      children.push(
        <div className = {style.container}>
          <div className={style.row}>
              <h2
              style={{width:100}}
              >{fieldText[i]}</h2>
              <br/>
            <div className={style.otherBox}>
            <Form.Item>
                {getFieldDecorator(fieldName[i], {
                })(
                  <InputNumber 
                    className={style.border}
                    min={0}
                    max={40}
                    placeholder="0" 
                />)
                }
              </Form.Item>
            </div>
          </div>
        </div>
          );
        }
        return children;
  }

  getSocial(column) {
    const first = column ? 4 : 0;
    const last = column ? 8 : 4;
    const { getFieldDecorator } = this.props.form;
    const children = [];
    for (let i = first; i < last; i++) {
      children.push(
          <Form.Item
          style={{marginLeft: 30}}
          >
            <div className={style.text}>
            <h3>{text[i].fieldText}</h3>
            <h4>{text[i].note}</h4>
            </div>
            {getFieldDecorator(`social-${i}`, {
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

  getFamilyComposition() {
    const fieldName = [ 'standart','large','incomplete' ];
    const fieldText = [ 'Cтандартная', 'Многодетная', 'Неполная'];
    const total = this.state.total;
    const value = [this.state.standart,this.state.large,this.state.incomplete]
    const calc = [
      this.state.large + this.state.incomplete,
      this.state.standart + this.state.incomplete,
      this.state.standart + this.state.large
    ];
    const change = [this.onStandartChange,this.onLargeChange,this.onIncompleteChange];
    const { getFieldDecorator } = this.props.form;
    const children = [];
    for (let i = 0; i < 3; i++) {
      children.push(
          <div className={style.row}>
          <div className={style.dynamicText}>
              <h2
              className={style.dynamicText}
              >{fieldText[i]}</h2>
              <br/>
            </div>
            <div className={style.otherBox}>
            <Form.Item>
                {getFieldDecorator(fieldName[i], {
                  rules: [
                  {
                    required: true,
                    message: "Распределите всех"
                  },
                ],
                validateTrigger: "onBlur"
                })(
                  <InputNumber 
                    className={style.border}
                    min={0}
                    max={convert(total,calc[i])}
                    value={value[i]}
                    onChange={change[i]}
                    placeholder="0" 
                />)
                }
              </Form.Item>
            </div>
          </div>
          );
        }
        return children;
  }

  getPlace() {
    const fieldName = [ 'parent', 'hostel', 'relative', 'privat' ];
    const fieldText = [ 'С родителями', 'В общежитии', 'У родственников', 'На частной квартире'];
    const total = this.state.total;
    const value = [this.state.parent,this.state.hostel,this.state.relative,this.state.privat]
    const calc = [
      this.state.hostel + this.state.relative + this.state.privat,
      this.state.parent + this.state.relative + this.state.privat,
      this.state.parent + this.state.hostel + this.state.privat,
      this.state.parent + this.state.hostel + this.state.relative
    ];
    const change = [this.onParentChange,this.onHostelChange,this.onRelativeChange,this.onPrivateChange];
    const { getFieldDecorator } = this.props.form;
    const children = [];

    for (let i = 0; i < 4; i++) {
      children.push(
          <div className={style.row}>
          <div className={style.dynamicText}>
              <h2
              className={style.dynamicText}
              >{fieldText[i]}</h2>
              <br/>
            </div>
            <Form.Item className={style.correction}>  
            <div className={style.row}>
                {getFieldDecorator(fieldName[i], {
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
                      max={convert(total,calc[i])}
                      onChange={change[i]}
                      value={typeof value[i] === 'number' ? value[i] : 0}
                    />)
                    }
                    <InputNumber
                      className={style.border}
                      min={0}
                      max={convert(total,calc[i])}
                      style={{ marginLeft: 16 }}
                      value={value[i]}
                      onChange={change[i]}
                    />
              </div>
              </Form.Item>
          </div>
          );
        }
        return children;
  }

  render() {
    const { current } = this.state;
    const { faculty, group, curator, phone  } = this.state;
    const { total, women, men } = this.state;
    const { getFieldDecorator, getFieldsError } = this.props.form;

    const steps = [
      {
        content: (
        <div>
        <div className={style.container}>
        <div className={style.select}>
        <Form.Item>
        <h2>Факультет:<span className={style.red}>*</span></h2>
        {getFieldDecorator('faculty', {
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
            onChange={this.onFacultyChange}
            onFocus={onFocus}
            onBlur={onBlur}
            onSearch={onSearch}
            filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            value={faculty}
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
          <h2>Название группы:<span className={style.red}>*</span></h2>
          {getFieldDecorator('group', {
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
              onChange={this.onGroupChange}
              value={group}
              placeholder="Группа" 
              />)
          }
          </Form.Item>
          </div>

          
          <div className={style.flex}>
          <div className={style.container}> 
            <h2>Куратор:<span className={style.red}>*</span></h2>
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
              value={curator}
              onChange={this.onCuratorChange}
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
                {getFieldDecorator('phone')(
                  <InputNumber
                    min={0}
                    value={phone}
                    onChange={this.onPhoneChange}
                    className={style.border}
                    style={{ width: '100%' }}
                  />)
                }
              </div>
              </Form.Item>
            </div>
          </div>
          

          
          <div className={style.colunm}>
          <Form.Item>
            <h2>Количество человек<span className={style.red}>*</span></h2>
            <div className={style.sliderBox}>
              <div className={style.row}>
              {getFieldDecorator('total', {
                  rules: [
                {
                  required: true,
                  message: "Пожалуйста укажите количество человек"
                },
                {
                  validateTrigger: "onBlur"
                }
                ],
                })(
                <Slider
                  min={0}
                  max={40}
                  onChange={this.onTotalChange}
                  value={typeof total === 'number' ? total : 0}
                />
                )
               }
                  <InputNumber
                  className={style.border}
                  min={0}
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
          <div className={style.dynamicText}>
              <h2
              className={style.dynamicText}
              >Девушек<span className={style.red}>*</span></h2>
              <br/>
            </div>
            <Form.Item>
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
                      max={convert(total,men)}
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
              </Form.Item>
          </div>
          <div className={style.row}>
          <div className={style.dynamicText}>
              <h2
              className={style.dynamicText}
              >Юношей<span className={style.red}>*</span></h2>
              <br/>
            </div>
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
          )
      },
      {
        content: (
          <div>
          <h2>Нахождение студентов в различных объединениях, сообществах и т.д.</h2>
          {this.getOrganisation()}
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
              <Tabs tabPosition="bottom">
                <TabPane tab="Часть 1" key="1">
                  <div className={style.column}>
                    {this.getSocial(0)}
                  </div>
                </TabPane>
                <TabPane tab="Часть 2" key="2">
                  <div className={style.column}>
                    {this.getSocial(1)}
                  </div>
                </TabPane>
              </Tabs>
              </div>
            </div>
        )
      },
      {
        content: (
          <div>
          <div className={style.padding}>
            <div className = {style.column}>
            <h2>Состав семей:<span className={style.red}>*</span></h2>
            {this.getFamilyComposition()}
            </div>
            </div>     
            

            <div className={style.container}>
            <div className = {style.column}>
            <h2>Проживают:<span className={style.red}>*</span></h2>
            {this.getPlace()}
            </div>
            </div>

            </div>
        )
      },
      {
        content: (
          <div className={style.padding}>
              <h2>Другие сведения</h2>
              {getFieldDecorator('more')(
                <TextArea 
                  className={style.border}
                  style={{height:120}}
                  />)
                  }
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
            <div className={style.flex}>
            <div style={{marginBottom:50}}>
            <h3>Поля, отмеченные <span className={style.red}>*</span> обязательны для заполнения</h3>
            </div>
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
              className={style.primary}
              disabled={hasErrors(getFieldsError())}
              onClick={() => this.next()}>
                Далее
              </Button>
            )}
            {current === 4 && (
              <Button type="primary" 
              style={{ width: 100 }}
              className={style.primary}
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