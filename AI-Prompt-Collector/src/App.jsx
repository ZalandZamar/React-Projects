import { useState } from 'react';
import './App.css'

function App() {
  const [inputText, setInputText] = useState('');
  const [prompts, setPrompts] = useState([]);

  function save(promptText) {
    setPrompts([...prompts, promptText]);
  }

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  return (
    <div>
      <input type='text' placeholder='Write a Prompt' onChange={saveInputText} />
      <button onClick={() => save(inputText)}>Save</button>

      <div>
        {
          prompts.map((prompt, index) => {
            return (
              <div key={index}>{prompt}</div>
            );
          })
        }
      </div>

    </div>
  );
}

export default App
