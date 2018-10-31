import React, { Component } from 'react';
import {Button,Card,Modal} from 'antd'
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftjs from 'draftjs-to-html'

import './index.less';
class Rich extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showRichText:false,
      editorContent: '',
      editorState: ''
    }
  }

  getState () {
    return this.state;
  }

  handleClearContent = () => {
    this.setState({
      editorState: '',
      editorContent: ''
    });
  }

  handleGetText = () => {
    this.setState({
      showRichText:true
    });
  }

  onEditorChange = (editorContent) => {
    this.setState({
        editorContent,
    });
  };

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState
    });
  }

  render () {
    const { editorState, showRichText, editorContent } = this.getState();
    return (
      <div className="rich-block">
        <Card className="card-item">
          <Button onClick={this.handleClearContent} className="button-item" type="primary">清空内容</Button>
          <Button onClick={this.handleGetText} className="button-item" type="primary">获取html文本</Button>
        </Card>
        <Card title="富文本编辑器" className="card-item">
          <Editor
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            editorState={editorState}
            onContentStateChange={this.onEditorChange}
            onEditorStateChange={this.onEditorStateChange}
          />
        </Card>

        <Modal
          title="富文本"
          visible={showRichText}
          onCancel={() => {
            this.setState({
              showRichText: false
            })
          }}
          footer={null}
          >
            {
              draftjs(editorContent)
            }
        </Modal>
      </div>
    )
  }
}

export default Rich;
