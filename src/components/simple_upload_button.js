import React from 'react'
import axios, { post } from 'axios';

const UPLOAD_NODE = "http://10.6.71.79:8074/"
class SimpleReactFileUpload extends React.Component {

    

    render() {
        return (
            <form onSubmit={this.onFormSubmit}>
                <h1>File Upload</h1>
                <input type="file" onChange={this.onChange} />
                <button type="submit">Upload</button>
            </form>
        )
    }
}



export default SimpleReactFileUpload