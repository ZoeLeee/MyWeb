import { Button, Input } from 'antd';
import axios from 'axios';
import * as React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Redirect } from 'react-router-dom';
import { DefaultConfig } from '../Utility/Default';
import { IArticleOption } from './Main/Main';
import { formateDate } from '../Utility/Utils';
import { Post } from '../Utility/Request';


/* 
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
const modules = {
  toolbar: [
    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' },
    { 'indent': '-1' }, { 'indent': '+1' }],
    ['link', 'image', 'video'],
    ['clean']
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  }
}
/* 
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
]

export interface IEditorState extends IArticleOption {
  redirect?:boolean;
}

export class EditorCom extends React.Component<{}, IEditorState> {
  private id="";
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: '',
      scanCount:"0",
      tag:["js"],
      time:"",
      redirect:false
    }
  }
  handleChange = (value) => {
    this.setState({ content: value })
  }
  handleClick = () => {
    this.setState({
      time:formateDate(new Date())
    })
    Post(DefaultConfig.url+'write', this.state,(res) => {
      if (res.status === 200 && res.data.success === "ok") {
        this.id=res.data.id;
        this.setState({redirect: true});
      }
    })
  }
  render() {
    if (this.state.redirect)
      return <Redirect push to={"/article/"+this.id} />;
  
    return (
      <div>
        <div>
          <label>标题</label>
          <Input
            placeholder="请输入文章标题"
            value={this.state.title}
            onChange={e => this.setState({ title: e.target.value })}
          />
        </div>
        <ReactQuill
          value={this.state.content}
          onChange={this.handleChange}
          modules={modules}
          formats={formats}
        />
        <div style={{
          display: "flex",
          justifyContent: "flex-end"
        }}>
          <Button
            onClick={()=>this.handleClick()}
          >发表</Button>
        </div>
      </div>
    )
  }
}