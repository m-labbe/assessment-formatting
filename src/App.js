import '@pluralsight/ps-design-system-normalize/dist/index.css'
import '@pluralsight/ps-design-system-core/dist/index.css'
import React from 'react';
import Question from './components/Question'
import './App.module.css';

const markdownExample = `
Foo \`console.log('foo')\` baz

| foo | bar |
|-----|-----|
| bar | baz |

\`\`\`js
const foo = "bar"
\`\`\`
`

const pythonStem = `
What are two ways to interpolate the \`my_key\` property of \`my_object\` into a string?:

\`\`\`python
my_object = {"my_key": python"}
\`\`\`
`
const pythonChoices = [
  "<p>\u2022 <code>'My string literal: {my_object[\"my_key\"]}'.format(my_object=my_object)</code><br> <br> \u2022<code>f'My string literal: {my_object[\"my_key\"]}'</code></p>",
  "<p>\u2022 <code>'My string literal: {my_object[my_key]}'.format(my_object)</code><br>\u2022 <code>f'My string literal: {my_object[\"my_key\"]}'</code></p>",
  "<p>\u2022 <code>'My string literal: {my_object[my_key]}'.format(my_object)</code><br> \u2022 <code>f'My string literal: {my_object[my_key]}'</code></p>", "<p>\u2022 <code>'My string literal: {my_object[my_key]}'.format(my_object=my_object)</code><br> <br> \u2022 <code>f'My string literal: {my_object[my_key]}'</code></p>"
]

const question1Props = {
    item_count: 0,
    item_limit: 10,
    stem: markdownExample,
    format: 'Multiple Choice',
    choices: [
      `\`\`\`js\nif (\${argument} != null) {\n    \${field} = \${argument};\n }`,
      '<pre>if (${field} != null) {\n    ${param} = ${field};\n</pre>',
      '<pre>if (${param} != null)\n    ${field} = ${param};\n</pre>',
      '<pre>if (${argument} != null)\n    ${param} = ${argument};\n</pre>'
    ],
    language: 'java'
  }

const question2Props = {
  item_count: 0,
  item_limit: 10,
  stem: pythonStem,
  choices: [
    `\`\`\`js\nif (\${argument} != null) {\n    \${field} = \${argument};\n }`,
    '<pre>if (${field} != null) {\n    ${param} = ${field};\n</pre>',
    '<pre>if (${param} != null)\n    ${field} = ${param};\n</pre>',
    '<pre>if (${argument} != null)\n    ${param} = ${argument};\n</pre>' 
  ],
  language: 'python'
}

function App() {
  return (
    <div className='App'>
      <section>
          <h3>Question with markdown</h3>
          <Question item={question1Props}/>
      </section>
      <section>
          <h3>Question with Python</h3>
          <Question item={question2Props}/>
      </section>
    </div>
  );
}

export default App;
