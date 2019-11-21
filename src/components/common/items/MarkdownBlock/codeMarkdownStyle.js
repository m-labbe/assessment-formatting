import { colors } from '@pluralsight/ps-design-system-core'

export default {
  'pre[class*="language-"]': {
    color: colors.bone,
    fontFamily: '"Source Code Pro", "Lucida Console","Courier New", Courier, monospace',
    fontSize: '16px',
    lineHeight: '1.375',
    direction: 'ltr',
    textAlign: 'left',
    wordSpacing: 'normal',
    MozTabSize: '4',
    OTabSize: '4',
    tabSize: '4',
    WebkitHyphens: 'none',
    MozHyphens: 'none',
    msHyphens: 'none',
    hyphens: 'none',
    background: colors.gray04,
    padding: '1em',
    margin: '.5em 0',
    overflow: 'auto',
  },
  'code[class*="language-"]': {
    color: colors.bone,
    fontFamily: '"Source Code Pro", "Lucida Console","Courier New", Courier, monospace',
    fontSize: '16px',
    lineHeight: '1.375',
    direction: 'ltr',
    textAlign: 'left',
    wordSpacing: 'normal',
    MozTabSize: '2',
    OTabSize: '2',
    tabSize: '2',
    WebkitHyphens: 'none',
    MozHyphens: 'none',
    msHyphens: 'none',
    hyphens: 'none',
    background: colors.gray04,
    overflow: 'auto',
  },
  ':not(pre) > code[class*="language-"]': {
    padding: '.1em',
    borderRadius: '.3em',
  },
  comment: {
    color: colors.gray02,
  },
  doctype: {
    color: colors.gray01,
  },
  punctuation: {
    color: colors.bone,
  },
  null: {
    color: colors.codeRed,
  },
  operator: {
    color: colors.bone,
  },
  boolean: {
    color: colors.codeOrange,
  },
  number: {
    color: colors.codeOrange,
  },
  tag: {
    color: colors.codePurple,
  },
  string: {
    color: colors.codeGreen,
  },
  selector: {
    color: colors.codeRed,
  },
  'attr-name': {
    color: colors.codeBlue,
  },
  'attr-value': {
    color: colors.codeGreen,
  },
  url: {
    color: colors.codeOrange,
  },
  '.language-css .token.string': {
    color: colors.codeGreen,
  },
  '.style .token.string': {
    color: colors.codeGreen,
  },
  keyword: {
    color: colors.codeRed,
  },
  regex: {
    color: colors.codeTurquoise,
  },
  parameter: {
    color: colors.codeYellow,
    'font-style': 'italic',
  },
  function: {
    color: colors.codeBlue,
  },
  'function-variable': {
    color: colors.bone,
  },
  method: {
    color: colors.codeBlue,
  },
  'class-name': {
    color: colors.codeYellow,
  },
  /*
   * We don't know what any of the styles below impact,
   * so they are set to Bone by default
   */
  'pre > code.highlight': {
    Outline: `.4em solid ${colors.bone}`,
    OutlineOffset: '.4em',
  },
  prolog: {
    color: colors.bone,
  },
  cdata: {
    color: colors.bone,
  },
  '.namespace': {
    //  'Opacity': '.7',
    color: colors.bone,
  },
  property: {
    color: colors.bone,
  },
  entity: {
    color: colors.bone,
    // 'cursor': 'help',
  },
  control: {
    color: colors.bone,
  },
  directive: {
    color: colors.bone,
  },
  unit: {
    color: colors.bone,
  },
  statement: {
    color: colors.bone,
  },
  atrule: {
    color: colors.bone,
  },
  placeholder: {
    color: colors.bone,
  },
  variable: {
    color: colors.bone,
  },
  important: {
    color: colors.bone,
    fontWeight: 'bold',
  },
}