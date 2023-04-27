import { useState } from "react";
import styled from "styled-components";
import { marked } from "marked";
import Prism from "prismjs";
import DOMPurify from "dompurify";

marked.setOptions({
  breaks: true,
  gfm: true,
  smartLists: true,
  highlight: function (e) {
    return Prism.highlight(e, Prism.languages.javascript, "javascript");
  },
});

const App = () => {
  const [markdown, setMarkdown] = useState(initialMarkdown);

  const handleChange = (event) => {
    setMarkdown(event.target.value);
  };

  return (
    <Container>
      <TextareaContainer>
        <Heading>Markdown</Heading>
        <Textarea
          id="editor"
          className="card"
          value={markdown}
          onChange={handleChange}
        />
      </TextareaContainer>
      <OutputContainer>
        <Heading>Output</Heading>
        <Output
          id="preview"
          className="card"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(
              marked.parse(markdown.replace(/\n(?=\n)/g, "\n\n<br/>\n"))
            ),
          }}
        />
      </OutputContainer>
    </Container>
  );
};

const initialMarkdown = `
  # This is a header.

  ## This is a sub header.

  Click [here](https://freecodecamp.org) to go to FCC.

  \`const myString = 'This is some inline code!'\`

  \`\`\`
  \\\\ This is a command.
  console.log('This is some code.')
  \`\`\`

  * This is a list item
  

  > This is a blockquote.

  ![FCC Logo](vite.svg)

  **This is some bolded text below an image!**
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 97vh;
  align-items: stretch;
`;

const Heading = styled.h2`
  font-size: 12px;
  margin-bottom: 2px;
`;

const TextareaContainer = styled.div`
  flex: 1 1 300px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 5px;
`;

const Textarea = styled.textarea`
  overflow-y: scroll;
  flex-basis: 100%;
  padding: 10px 10px 1px;
  resize: none;
  background-color: #f8fafc;
`;

const OutputContainer = styled.div`
  flex: 1 1 700px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 5px;
`;

const Output = styled.div`
  flex-basis: 100%;
  overflow-y: scroll;
  position: relative;
  background-color: #f8fafc;
  font-family: "Helvita", "Arial", sans-serif;
`;

export default App;
