import React from 'react';
import { Input, Icon } from 'antd';
import 'antd/dist/antd.css';

class SearchBar extends React.Component {
    render(){

        return (
            <Input 
              style={{ verticalAlign: 'middle' }} 
              placeholder="搜索" 
              addonAfter={<Icon type="search" />} 
            />
        )

    }
}

export default SearchBar;