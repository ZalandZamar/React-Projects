import { useState } from 'react'
import { CreateBoard } from './components/CreateBoard.jsx'
import './App.css'

const STEPS = {
  createBoard: "createBoard"
}

function App() {
  const [step, setStep] = useState(STEPS.createBoard);

  function renderSteps() {
    switch (step) {
      case STEPS.createBoard:
        return <CreateBoard />

      default:
        return null
    }
  }

  return (
    <div>
      {renderSteps(step)}
    </div>
  );
}

export default App
