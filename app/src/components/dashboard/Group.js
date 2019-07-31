import React from "react";
import style from "./style.module.scss"
import { Form, Input,Row, Col, Collapse, Icon, Modal } from "antd";
const { Search } = Input;
const { Panel } = Collapse;

let id = 0;

class Group extends React.Component {

  remove = k => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  };

  add = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(id++);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  };

  state = {
    modalVisible: false
  };

  setModalVisible(modalVisible) {
    this.setState({ modalVisible });
  }

  render() {
    return (
          <Row className={style.container}>
            <Col className={style.infoBlock}>
          <div className={style.margin}>
              <Form>
              <Search
                onSearch={value => console.log(value)}
                style={{ width: 200 }}
                placeholder="Найти"
              />
              </Form>
              <Collapse
                bordered={false}
                defaultActiveKey={['1']}
                expandIcon={({ isActive }) => <Icon type="right" rotate={isActive ? 90 : 0} />}>
              <Panel header="Мои группы" key="1">
              <div className={style.container}>
              <p>АС-52</p><Icon type="delete" className={style.margin}/>
              </div>
              </Panel>
              </Collapse>
            </div>
            <br/>
            <br/>
            <div className={style.margin}>
            <Collapse
                bordered={false}
                defaultActiveKey={['1']}
                expandIcon={({ isActive }) => <Icon type="right" rotate={isActive ? 90 : 0} />}>
              <Panel header="Факультеты" key="1">
              <p>ЭИС</p>
              <p>СФ</p>
              <p>ЭФ</p>
              <p>ФИСЭ</p>
              <p>МСФ</p>
              </Panel>
              </Collapse>
            </div>
            </Col>

            <Col className={style.groupBlock}>
            <div className={style.flex}>
              <h2>Доска-></h2><h2>Группы</h2>
            </div>
            <div className={style.bottom}>
                <div className={style.flex} onClick={() => this.setModalVisible(true)}>
                <Icon type="plus" className={style.margin}/><p className={style.margin}>Добавить студента</p>
                </div>
                <div className={style.flex}>
                <Icon type="delete" className={style.margin}/><p className={style.margin}>Удалить</p>
                </div>
            </div>
            </Col>
            <Col>
              
            </Col>

        <Modal
          title="Vertically centered modal dialog"
          centered
          visible={this.state.modalVisible}
          onOk={() => this.setModalVisible(false)}
          onCancel={() => this.setModalVisible(false)}
        >
          <p>some contents...</p>
          <p>some contents...</p>
          <p>some contents...</p>
        </Modal>

        </Row>
    );
  }
}

export default Group;