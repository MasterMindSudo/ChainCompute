import React from 'react';
import 'antd/dist/antd.css';
import { Upload, Icon, Button, Modal, Input, List, Form, Tabs, Progress, InputNumber,message } from 'antd';
import reqwest from 'reqwest';
import axios, { post } from 'axios';
// Dragger

const { Dragger } = Upload;

const props = {
  name: 'file',
  multiple: true,
  action: 'http://10.6.71.79:8074/v1/un/upload/file',
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
const UPLOAD_NODE = "http://10.6.71.79:8074/"

class Upload_multi_button extends React.Component {

  // Modal 

  state = {
    fileList: [],
    uploading: false,
    visible: false ,
  };

  handleUpload = () => {
    const { fileList } = this.state;
    
    fileList.forEach(file => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append("expire_days", "5");
      fetch('http://10.6.71.79:8074/v1/un/upload/file',{
        
        method: 'POST',
        // processData: false,
        body: formData,
        //headers:{}
      }).then(res => {
        console.log(res)
      });
    });
    this.setState({
      fileList: [],
      uploading: false,
    });
    this.setState({
      uploading: true,
    });

    // You can use any AJAX library you like

  };

  

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

    const { uploading, fileList } = this.state;
    const props = {
      onRemove: file => {
        this.setState(state => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: file => {
        this.setState(state => ({
          fileList: [...state.fileList, file],
        }));
        return false;
      },
      fileList,
    };
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
                  <div>
                    <Upload {...props}>
                      <Button>
                        <Icon type="upload" /> Select File
                      </Button>
                    </Upload>
                    <Button
                      type="primary"
                      onClick={this.handleUpload}
                      disabled={fileList.length === 0}
                      loading={uploading}
                      style={{ marginTop: 16 }}
                    >
                      {uploading ? 'Uploading' : 'Start Upload'}
                    </Button>
                  </div>


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