import React from 'react'
import axios, { post } from 'axios';

const UPLOAD_NODE = "http://10.6.71.79:8074/"
class SimpleReactFileUpload extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            file: null
        }
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.fileUpload = this.fileUpload.bind(this)
    }
    onFormSubmit(e) {
        e.preventDefault() // Stop form submit
        this.fileUpload(this.state.file).then((response) => {
            console.log(response.data);
        })
    }
    onChange(e) {
        this.setState({ file: e.target.files[0] })
    }
    fileUpload(file) {
        const url = `${UPLOAD_NODE}/v1/un/upload/file`;
        const formData = new FormData();
        formData.append('file', file)
        form.append("expire_days", "5");
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                "cache-control": "no-cache",
                "Postman-Token": "d4f8f088-b1be-4682-8eca-f2932be84082"
            }
        }
        return post(url, formData, config)
    }

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