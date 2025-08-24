import { useState, useEffect } from 'react';
import { CreateProject } from './components/CreateProject.jsx';
import { DisplayProjects } from './components/DisplayProjects.jsx';
import './App.css';

const STEPS = {
  createProject: "createProject",
  displayProjects: "addProjectToStorage",
};

function App() {
  const [step, setStep] = useState(STEPS.displayProjects);
  const [projectName, setProjectName] = useState('');
  const [saveProjectsArr, setSaveProjectsArr] = useState(JSON.parse(localStorage.getItem('projects')) || []);

  function renderSteps() {
    switch (step) {

      case STEPS.createProject:
        return <CreateProject setStep={setStep}
          STEPS={STEPS}
          projectName={projectName}
          setProjectName={setProjectName}
          setSaveProjectsArr={setSaveProjectsArr}
        />

      case STEPS.displayProjects:
        return <DisplayProjects saveProjectsArr={saveProjectsArr}
          setSaveProjectsArr={setSaveProjectsArr}
          setStep={setStep}
          STEPS={STEPS}
          />

      default:
        return null;
    }
  }

  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(saveProjectsArr));
  }, [saveProjectsArr])

  return (
    <div>
      {renderSteps(step)}
    </div>
  );
}

export default App
