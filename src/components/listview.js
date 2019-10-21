import React from 'react';
import 'antd/dist/antd.css';
import { Table, Divider, Tag, Descriptions } from 'antd';
//import reqwest from 'reqwest';


const ADC_node = "http://10.6.71.143:7001/"


const columns = [
  {
    title:'Job Name',
    dataIndex:'name',
    key:'name',
    render:text=><a>{text}</a>
  },
  {
    title: 'Description of job',
    dataIndex:'description',
    key:'description',
    render:text=><a>{text}</a>
  },
  {
    title: 'State of job',
    dataIndex:'state',
    key:'state',
    render:text=><a>{text}</a>
  },
  {
    title: 'Action',
    key:'action',
    render: (text,record) => (
      <span>
        <a>Download {record.name}'s outpak (zip)</a>
        <Divider type = "vertical"/>
        <a>Download {record.name}'s outjson (list of AFID)</a>
        <Divider type = "vertical"/>
        <a>Download {record.name}'s result (txt)</a>
      </span>
    )
  }
]
const dataSource = [
  {
    key:'some_contractID',
    name:'Video Convertion',
    description:'Convert any video to streaming format',
    state: 'In progress'
  }
  

]
class ListView extends React.Component{
  render(){
    
    return (
      <Table columns={columns} dataSource={dataSource} />
    )
    }
  
}
//ReactDOM.render(<Table columns={columns} dataSource={data} />, mountNode);


export default ListView;

