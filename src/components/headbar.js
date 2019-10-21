import React from 'react';
import 'antd/dist/antd.css';
import { Icon, Button, Typography, Row, Col } from 'antd';
import SearchBar from "./searchbar"
import Multi_upload_Button from "./upload_multi_button"

const { Text } = Typography;

class HeadBar extends React.Component {
    render(){

        return (
            <Row>
                <Col span={6}> 
                    <Text strong style={{ fontSize: 20}}>
                         ChainCompute
                    </Text>
                </Col>
                <Col span={12}>     
                    <SearchBar/>
                </Col>
                <Col span={5}>
                </Col>
                <Col span={1} >
                    <Multi_upload_Button/>
                    
                </Col>
          </Row>
        )

    }
}

export default HeadBar;