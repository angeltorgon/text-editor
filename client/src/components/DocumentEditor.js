import React from 'react';
import "./styles/document-editor.css"
import { Editor, EditorState, RichUtils, Modifier } from 'draft-js';

class DocumentEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
    this.onChange = editorState => {
      this.setState({ editorState });
    };
    this.onFocus = () => this.refs.editor.focus();
  }

  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      this.onChange(newState);
      return 'handled';
    }

    return 'not-handled';
  }

  render() {
    return (
      <div className="editor" onClick={this.onFocus}>
        <Editor
          ref="editor"
          editorState={this.state.editorState}
          handleKeyCommand={this.handleKeyCommand}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

export default DocumentEditor;
