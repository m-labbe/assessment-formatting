import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import codeMarkdownStyles from './codeMarkdownStyle'

const CodeBlock = ({ value, language }) => (
  <SyntaxHighlighter
    language={language}
    style={codeMarkdownStyles}
    useInlineStyles={true}
  >
    {value}
  </SyntaxHighlighter>
)

const Markdown = ({ source }) => (
  <ReactMarkdown
    source={source}
    escapeHtml={false}
    renderers={{ code: CodeBlock }}
  />
)

export default Markdown