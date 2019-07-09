import { Button, Input } from 'antd';
import * as React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { updateArticle, writeArticle } from '../actions/articles';
import { formateDate } from '../utils/Utils';
import { IReduxProps } from './App';
import { IArticleOption } from './Main/Main';

/* 
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
// console.log('window["hljs"].: ', window["hljs"]);


var bindings = {
  // This will overwrite the default binding also named 'tab'
  tab: {
    key: 9,
    handler: function() {
      // Handle tab
    }
  },

  // There is no default binding named 'custom'
  // so this will be added without overwriting anything
  custom: {
    key: 'B',
    shiftKey: true,
    handler: function(range, context) {
      // Handle shift+b
      console.log(range,context);
    }
  },
};

const modules = {
  syntax:true,
  toolbar: [
    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' },
    { 'indent': '-1' }, { 'indent': '+1' }],
    ['link', 'image', 'video'],
    ['clean']
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
  keyboard:{
    bindings
  }
}

window["hljs"].configure({   // optionally configure hljs
  languages: ['javascript','typescript']
});

/* 
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video','code-block',
]

export interface IEditorState extends IArticleOption {
  redirect?: boolean;
}

class EditorCom extends React.Component<IReduxProps, IEditorState> {
  private id = "";
  private isUpdate = false;
  constructor(props) {
    super(props);
    let state = this.props.history.location.state;
    this.isUpdate = Boolean(state);
    if (state)
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
      this.props.dispatch(updateArticle(newData)).then(isOK => {
        isOK && this.setState({ redirect: true });
      })
    }
    else {
      this.props.dispatch(writeArticle(this.state)).then(id=>{
        if(id){
          this.id = id;
          this.setState({ redirect: true });
        }
      })
    }
  }
  render() {
    if (this.state.redirect)
      return <Redirect push to={"/article/" + this.id} />;

    return (
      <div className="editor">
        <div>
          <Link to="/">首页</Link>
          <label>标题</label>
          <Input
            placeholder="请输入文章标题"
            value={this.state.title}
            onChange={e => this.setState({ title: e.target.value })}
          />
        </div>
        <ReactQuill
          value={this.state.content || ""}
          onChange={this.handleChange}
          modules={modules}
          formats={formats}
          scrollingContainer="ql-editor"
        />
        <div style={{
          display: "flex",
          justifyContent: "flex-end",
          
        }}>
          <Button
            onClick={() => this.handleClick()}
          >{this.isUpdate ? "更新" : "发表"}</Button>
        </div>
      </div>
    )
  }
}

export default connect()(EditorCom);