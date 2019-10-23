import React from 'react';
import 'antd/dist/antd.css';
import { Upload, Icon, Button, Modal, Input, List, Form, Tabs, Progress, InputNumber, message, Select } from 'antd';
import reqwest from 'reqwest';
import axios, { post } from 'axios';
import { resetWarningCache } from 'prop-types';
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
const { Option } = Select;
const UPLOAD_NODE = "http://10.6.71.79:8074/"




class Upload_multi_button extends React.Component {

  // Modal 

  state = {
    fileList: [],
    uploading: false,
    visible: false,
    afidList: [],
    OSdisable: true,
    ARCHdisable: true,
    OS: '',
    Arch: '',
  };
  ADCaddress = '12kcGKwLvxbhz2V1LSjbw3dTD6PhW4DuWM'
  
  task = {
    address: '12kcGKwLvxbhz2V1LSjbw3dTD6PhW4DuWM',
    name: 'pwl_test7',
    script: '1e0000000000051b050193d83f70f95c5ec97522dc04f72fd31042cf0799ac519ceac9c1f97e5f3ed60dca85fa1a7c76900191ea5091bd1e6050b21e63c41244',
    bounty: 200,
    taskTime: 60,
    numRequired: 1,
    os: 'linux',
    arch: 'amd64',
  }
  handleChangeArch = (value) => {
    console.log(`selected ${value}`);
    this.setState({
      Arch: value
    })
  }

  handleChangeOS = (value) => {
    console.log(`selected ${value}`);
    this.setState({
      OS: value
    })
  }
  handleChangeMod = (value) => {
    console.log(`selected ${value}`);
    if (value == 'Custom') {
      console.log("disabled select")
      this.setState({
        OSdisable: false,
        ARCHdisable: false,


      })

    } else {
      console.log("disabled select")
      this.setState({
        OSdisable: true,
        ARCHdisable: true,
        OS: 'linux',
        Arch: 'amd64'
      })
    }
  }

  handleUpload = () => {
    const { fileList } = this.state;


    fileList.forEach(file => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append("expire_days", "5");
      this.setState({
        uploading: true,
      });
      fetch('http://10.6.71.79:8074/v1/un/upload/file', {

        method: 'POST',
        // processData: false,
        body: formData,
        //headers:{}

      }).then(res => res.json()).then(response => {
        console.log(response)
        console.log(response.status);
        if (response.status == 1) {
          this.setState({
            afidList: this.state.afidList.concat(response.afid)
          })
          console.log(this.state.afidList)
        }


      });
    });
    this.setState({
      fileList: [],
      uploading: false,
    });
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
    console.log(JSON.stringify(this.task))
    fetch("http://10.6.71.143:7001/contract/computation", {
      method: 'POST',
      body: JSON.stringify(this.task),
    }).then(res=>res.json()).then(response =>{
      console.log(response)
    })

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
                <Form.Item label="Task Workers Number(1-10)" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>

                  {getFieldDecorator('input-worker', { initialValue: 1 })(<InputNumber min={1} max={10} />)}
                  <span className="ant-form-text"> Workers</span>
                </Form.Item>
                <Form.Item label="Modules" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
                  <div>
                    <Select defaultValue="Transcoding Videos" style={{ width: 120 }} onChange={this.handleChangeMod} >
                      <Option value="Transcoding Videos">Transcoding</Option>
                      <Option value="Custom">Custom</Option>
                    </Select>
                  </div>
                </Form.Item>
                <Form.Item label="Target Architecture" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
                  <div>

                    <Select defaultValue="amd64" style={{ width: 120 }} onChange={this.handleChangeArch} disabled={this.state.ARCHdisable}>
                      <Option value="amd64">amd64</Option>
                      <Option value="x86">x86</Option>
                      <Option value="arm32">arm32</Option>
                      <Option value="arm64">arm64</Option>
                    </Select>

                  </div>
                </Form.Item>
                <Form.Item label="Target OS" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
                  <div>
                    <Select defaultValue="linux" style={{ width: 120 }} onChange={this.handleChangeOS} disabled={this.state.OSdisable}>
                      <Option value="linux">linux</Option>
                      <Option value="windows">windows</Option>
                      <Option value="macos">macos</Option>
                    </Select>
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