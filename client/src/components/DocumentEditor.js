import React from 'react';
import "./styles/document-editor.css"
import {
  EditorState,
  ContentState,
  Modifier,
  convertToRaw,
  convertFromRaw
} from 'draft-js';
import createMentionPlugin, {
  defaultSuggestionsFilter
} from 'draft-js-mention-plugin';
import Editor from 'draft-js-plugins-editor';
import mentions from './data/mentions'
import pluginStyles from '../../node_modules/draft-js-mention-plugin/lib/plugin.css';

class DocumentEditor extends React.Component {
  constructor(props) {
    super(props);
    const doc = JSON.parse(localStorage.getItem('document'));
    this.state = {
      editorState: doc ? EditorState.createWithContent(convertFromRaw(doc)) : EditorState.createEmpty(),
      suggestions: mentions
    };
    this.onChange = editorState => {
      const contentState = this.state.editorState.getCurrentContent();
      const raw = convertToRaw(contentState);
      localStorage.setItem("document", JSON.stringify(raw, null, 2));

      this.setState({ editorState });
    };
    this.onFocus = () => this.refs.editor.focus();
    this.mentionPlugin = createMentionPlugin();
  }

  onSearchChange = ({ value }) => {
    this.setState({
      suggestions: defaultSuggestionsFilter(value, mentions)
    });
  };

  render() {
    const { MentionSuggestions } = this.mentionPlugin;
    const plugins = [this.mentionPlugin];

    return (
      <div className="editor" onClick={this.onFocus}>
        <Editor
          ref="editor"
          editorState={this.state.editorState}
          onChange={this.onChange}
          plugins={plugins}
        />
        <MentionSuggestions
          onSearchChange={this.onSearchChange}
          suggestions={this.state.suggestions}
          onAddMention={this.onAddMention}
        />
      </div>
    );
  }
}

export default DocumentEditor;
