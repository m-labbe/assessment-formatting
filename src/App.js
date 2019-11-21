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

const question1Props = {
    item_count: 0,
    item_limit: 10,
    stem: markdownExample,//'<pre>In Eclipse IDE,</pre> `assuming` that the type is not a primitive one, create a setter method template that checks if a passed parameter is not null before setting the value.\n',
    format: 'Multiple Choice',
    choices: [
      '<pre>if (${argument} != null)\n    ${field} = ${argument};\n</pre>',
      '<pre>if (${field} != null)\n    ${param} = ${field};\n</pre>',
      '<pre>if (${param} != null)\n    ${field} = ${param};\n</pre>',
      '<pre>if (${argument} != null)\n    ${param} = ${argument};\n</pre>'
    ],
  }

function App() {
  return (
    <div className='App'>
      <section>
          <h3>Question with markdown</h3>
          <Question item={question1Props}/>
      </section>
    </div>
  );
}

export default App;
