import { useState, useEffect } from 'react';
import { DisplayNotes } from "./components/DisplayNotes.jsx";
import { AddNotes } from './components/AddNotes.jsx';
import './App.css';

const STEPS = {
  displayNotes: "displayNotes",
  addNotes: "addNotes"
};

function App() {
  const [step, setStep] = useState(STEPS.displayNotes);
  const [notes, setNotes] = useState(JSON.parse(localStorage.getItem('notes')) || []);
  const [category, setCategory] = useState('work');
  const [displayCategory, setDisplayCategory] = useState('work');
  const [noteValue, setNoteValue] = useState('');

  function renderSteps() {
    switch (step) {
      case STEPS.displayNotes:
        return <DisplayNotes
          notes={notes}
          setNotes={setNotes}
          STEPS={STEPS}
          setStep={setStep}
          category={category}
          setCategory={setCategory}
          displayCategory={displayCategory}
          setDisplayCategory={setDisplayCategory}
        />

      case STEPS.addNotes:
        return <AddNotes
          notes={notes}
          setNotes={setNotes}
          category={category}
          setCategory={setCategory}
          noteValue={noteValue}
          setNoteValue={setNoteValue}
          setStep={setStep}
          STEPS={STEPS}
        />

      default:
        return null;
    }
  }

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  return (
    <div>
      {renderSteps(step)}
    </div>
  );
}

export default App
