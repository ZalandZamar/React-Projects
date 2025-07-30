import { useState, useEffect } from 'react';
import './App.css'

function App() {
  //const fromLocalStorage = JSON.parse(localStorage.getItem('prompt'));

  const [inputText, setInputText] = useState('');
  const [prompts, setPrompts] = useState(JSON.parse(localStorage.getItem('prompts')) || []);

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  function save(promptText) {
    setPrompts([...prompts, promptText]);
    setInputText('');
  }

  function inputSaveByEnter(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      save(inputText)
    }
  }

  function deletePromptBtn(index) {
    setPrompts(prompts.filter((_, i) => i !== index));
  }

  function deleteAll() {
    setPrompts([]);
  }

  useEffect(() => {
    localStorage.setItem('prompts', JSON.stringify(prompts));
  }, [prompts]);

  return (
    <div className='container'>
      <input
        type='text'
        placeholder='Write a Prompt'
        onChange={saveInputText}
        value={inputText}
        onKeyDown={inputSaveByEnter}
        className='input' />

      <button
        onClick={() => save(inputText)}
        className='save-button'>Save</button>

      <button
        onClick={deleteAll}
        className='delete-all-button'>Delete All</button>

      {
        prompts.map((prompt, index) => {
          return (
            <div
              key={index}
              className='prompts-container'>
                
              <span className='prompt-content'>{prompt}</span>

              <button
                onClick={() => { deletePromptBtn(index)}}
                className='delete-button'
              >Delete</button>
            </div>
          );
        })
      }
    </div>
  );
}

export default App
