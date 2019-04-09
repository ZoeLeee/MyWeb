import { Button, Input } from 'antd';
import { History } from 'history';
import * as React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Redirect } from 'react-router-dom';
import { ReqApi } from '../utils/Default';
import { Post, RequestStatus } from '../utils/Request';
import { formateDate } from '../utils/Utils';
import { IArticleOption } from './Main/Main';


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
  redirect?: boolean;
}
export class EditorCom extends React.Component<{ history: History }, IEditorState> {
  private id = "";
  private isUpdate = false;
  constructor(props) {
    super(props);
    let state = this.props.history.location.state;
    this.isUpdate = Boolean(state);
    if(state)
      this.id = state.id;
    this.state = {
      title: state ? state.title : '',
      content: state ? state.content : '',
      scanCount: "0",
      tag: ["js"],
      time: "",
      redirect: false
    }
  }
  handleChange = (value) => {
    this.setState({ content: value })
  }
  handleClick = () => {
    this.setState({
      time: formateDate(new Date())
    })
    if (this.isUpdate) {
      let id = this.id;
      let newData = {
        _id: id,
        ...this.state
      }
      Post(ReqApi.Update, newData,res=>{
        if (res.status === 200 && res.data.code === RequestStatus.Ok) {
          this.setState({ redirect: true });
        }
      })
    } 
    else {
      Post(ReqApi.Write, this.state, (res) => {
        if (res.status === 200 && res.data.code === RequestStatus.Ok) {
          this.id = res.data.data;
          this.setState({ redirect: true });
        }
      })
    }
  }
  render() {
    if (this.state.redirect)
      return <Redirect push to={"/article/" + this.id} />;

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
            onClick={() => this.handleClick()}
          >{this.isUpdate ? "更新" : "发表"}</Button>
        </div>
      </div>
    )
  }
}