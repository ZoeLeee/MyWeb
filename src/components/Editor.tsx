import * as React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { articleMap } from './App';



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

interface IEditorState {
  text: string
}

export class EditorCom extends React.Component<{}, IEditorState> {
  constructor(props) {
    super(props);
    this.state = { text: '' }
  }
  handleChange = (value) => {
    this.setState({ text: value })
  }
  handleClick=()=>{
    console.log(this.state.text);
    articleMap.set("first",this.state.text)
  }
  render() {
    return (
      <div>
        <ReactQuill
          value={this.state.text}
          onChange={this.handleChange}
          modules={modules}
          formats={formats}
        />
        <div style={{
          display:"flex",
          justifyContent:"flex-end"
        }}>
            <Link to="article/first" >
                <Button
                onClick={this.handleClick}
              >发表</Button>
            </Link>
        
        </div>
      </div>
    )
  }
}