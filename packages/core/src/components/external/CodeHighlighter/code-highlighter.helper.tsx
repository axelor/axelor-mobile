import {idea, vs2015, xcode} from 'react-syntax-highlighter/styles/hljs';

export const jsonPrettier = (data: any): string =>
  JSON.stringify(data, undefined, 2);

export enum CodeHighlighterLanguage {
  BASH = 'bash',
  C = 'c',
  CPP = 'cpp',
  CSHARP = 'csharp',
  CSS = 'css',
  DART = 'dart',
  DOCKER_FILE = 'dockerfile',
  EXCEL = 'excel',
  GO = 'go',
  GRADLE = 'gradle',
  GROOVY = 'groovy',
  HTML = 'HTML',
  JAVA = 'java',
  JAVASCRIPT = 'javascript',
  JSON = 'json',
  KOTLIN = 'kotlin',
  MARKDOWN = 'markdown',
  NGNIX = 'nginx',
  OBJECTIVEC = 'objectivec',
  PGSQL = 'pgsql',
  PHP_TEMPLATE = 'phpTemplate',
  PHP = 'php',
  PLAIN_TEXT = 'plaintext',
  PYTHON = 'python',
  RUBY = 'ruby',
  SHELL = 'shell',
  SQL = 'sql',
  TYPESCRIPT = 'typescript',
  VIM = 'vim',
  XML = 'xml',
  YAML = 'yaml',
}

export enum CodeHighlighterTheme {
  DARK = vs2015,
  LIGHT = idea,
  SECONDARY_LIGHT = xcode,
}
