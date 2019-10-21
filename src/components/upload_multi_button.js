import React from 'react';
import 'antd/dist/antd.css';
import { Upload, Icon, Button, Modal, Input, List, Form, Tabs, Progress, InputNumber } from 'antd';


// Dragger

const { Dragger } = Upload;

const props = {
  name: 'file',
  multiple: true,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

//


// TabPane // 

const { TabPane } = Tabs;
const UPLOAD_NODE = "http://10.6.71.79:8074/v1/un/upload/file"

function* uploadFile(action) {  
  const { file } = action;  
  const formData = new FormData();  
  formData.append('file', file);  
  formData.append('expire_days', '-1');  


  const options = {  
    method: 'POST',  
    body: formData,  
  };  
  const res = yield request(`${UPLOAD_NODE}/v1/un/upload/file`, options);  
  if (res.status === 1) {  
    yield put(uploadFileSuccess());  
    yield put(updateDocument(file.name, res.afid));  
    return file.name,res.afid
  }  
}

// 

class Upload_multi_button extends React.Component {

  // Modal 

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };
  normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };

  //

  // Switch 

  onChange = checked => {
    console.log(`switch to ${checked}`);
  }

  // 

  
  render() {
    const { getFieldDecorator } = this.props.form;
    return (

      <span>

        <Button onClick={this.showModal}><Icon type="upload" /></Button>
        <Modal
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Local file upload" key="1">
              <Form layout="horizontal">
                <Dragger {...props}>
                  <p className="ant-upload-drag-icon">
                    <Icon type="inbox" />
                  </p>
                  <p className="ant-upload-text">Drag file here or click to select</p>
                  <p className="ant-upload-hint">

                  </p>
                </Dragger>,
                            <Form.Item label="File name" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
                  <Input defaultValue="" />
                </Form.Item>

              </Form>
            </TabPane>

            <TabPane tab="New task" key="2">
              <Form layout="horizontal">
                <Form.Item label="Task name" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
                  <Input defaultValue="" />
                </Form.Item>

                <Form.Item label="Task Bounty" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>

                  {getFieldDecorator('input-number', { initialValue: 1 })(<InputNumber min={1} max={100} />)}
                  <span className="ant-form-text"> Tokens</span>
                </Form.Item>
                <Form.Item label="Data Upload" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
                  {getFieldDecorator('upload', {
                    valuePropName: 'fileList',
                    getValueFromEvent: this.normFile,
                  })(
                    <Upload name="logo" customaction={uploadFile(this.normFile)} listType="picture">
                      <Button>
                        <Icon type="upload" /> Click to upload
              </Button>
                    </Upload>,
                  )}
                </Form.Item>

              </Form>
            </TabPane>
          </Tabs>
        </Modal>
      </span>
    )
  }
}
export default Form.create()(Upload_multi_button)
//export default Upload_multi_button;