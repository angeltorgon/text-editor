import React from 'react';
import "./styles/document-editor.css"
import { EditorState, RichUtils, Modifier } from 'draft-js';
import createMentionPlugin, {
  defaultSuggestionsFilter
} from 'draft-js-mention-plugin';
import Editor from 'draft-js-plugins-editor';
import mentions from './data/mentions'
import pluginStyles from '../../node_modules/draft-js-mention-plugin/lib/plugin.css';

class DocumentEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      suggestions: mentions
    };
    this.onChange = editorState => {
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

  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      this.onChange(newState);
      return 'handled';
    }

    return 'not-handled';
  }

  render() {
    const { MentionSuggestions } = this.mentionPlugin;
    const plugins = [this.mentionPlugin];

    return (
      <div className="editor" onClick={this.onFocus}>
        <Editor
          ref="editor"
          editorState={this.state.editorState}
          handleKeyCommand={this.handleKeyCommand}
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
