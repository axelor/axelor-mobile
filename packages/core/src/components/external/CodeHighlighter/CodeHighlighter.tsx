import React from 'react';
import {
  CodeHighlighterLanguage,
  CodeHighlighterTheme,
  jsonPrettier,
} from './code-highlighter.helper';
import SyntaxHighlighter from 'react-native-syntax-highlighter';
import {View} from 'react-native';

interface CodeHighlighterProps {
  code: string | JSON;
  language?: CodeHighlighterLanguage;
  theme?: CodeHighlighterTheme;
  style?: any;
}

const CodeHighlighter = ({
  code,
  style,
  language = CodeHighlighterLanguage.PLAIN_TEXT,
  theme = CodeHighlighterTheme.LIGHT,
}: CodeHighlighterProps) => {
  return (
    <View style={style}>
      <SyntaxHighlighter language={language} style={theme} highlighter="hljs">
        {language === CodeHighlighterLanguage.JSON ? jsonPrettier(code) : code}
      </SyntaxHighlighter>
    </View>
  );
};

export default CodeHighlighter;
