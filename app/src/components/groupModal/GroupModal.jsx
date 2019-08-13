import React from "react";
import { Form, Modal, Button, Steps, Row, Col } from "antd";

class GroupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: true,
      current: 0,
      form: {}
    };
  }

  steps = [{}, {}];

  render() {
    var { current } = this.state;
    return (
      <Modal
        title="Добавление группы"
        centered
        destroyOnClose={true}
        maskClosable={false}
        onCancel={() => this.setModalVisible(false)}
        visible={this.state.modalVisible}
        footer={
          <Row>
            <Col>
              {current > 0 && (
                <Button onClick={() => this.prev()}>Назад</Button>
              )}
              <Button type="primary" onClick={() => this.next()}>
                {current < 4 ? "Далее" : "Готово"}
              </Button>
            </Col>
          </Row>
        }
      >
        <Form>
          <Steps current={current}>
            {this.steps.map(item => (
              <Steps.Step key={item} />
            ))}
          </Steps>
          {this.steps[current].content}
        </Form>
      </Modal>
    );
  }
}

const WrappedGroupForm = Form.create({ name: "group" })(GroupForm);

export default WrappedGroupForm;
