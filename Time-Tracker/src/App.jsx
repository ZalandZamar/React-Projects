import { useState, useEffect } from 'react';
import { CreateProject } from './components/CreateProject.jsx';
import { DisplayProjects } from './components/DisplayProjects.jsx';
import './App.css';
import { UpdateProjectName } from './components/UpdateProjectName.jsx';
import { ViewProject } from './components/ViewProjects.jsx';

const STEPS = {
  createProject: "createProject",
  displayProjects: "addProjectToStorage",
  updateProjectName: "updateProjectName",
  viewProject: "viewProject"
};

function App() {
  const [step, setStep] = useState(STEPS.displayProjects);
  const [projectName, setProjectName] = useState('');
  const [saveProjectsArr, setSaveProjectsArr] = useState(JSON.parse(localStorage.getItem('projects')) || []);
  const [clickedProjectIndex, setClickedProjectIndex] = useState(null);
  const [saveProjectNameInput, setSaveProjectNameInput] = useState([]);
  const [saveTimesArr, setSaveTimesArr] = useState(JSON.parse(localStorage.getItem('timeRecords')) || []);
  const [logTimesArr, setLogTimesArr] = useState(JSON.parse(localStorage.getItem('logTimesArr')) || []);
  const [startTimesArr, setStartTimesArr] = useState(JSON.parse(localStorage.getItem('startTimesArr')) || []);

  function editProjectName(i) {
    setClickedProjectIndex(i);
    const selectedBill = saveProjectsArr[i];

    setSaveProjectNameInput(selectedBill);
    setStep(STEPS.updateProjectName);
  }

  function confirmEditProjectName() {
    const newArr = [...saveProjectsArr];
    newArr[clickedProjectIndex] = saveProjectNameInput;

    setSaveProjectsArr(newArr);
    setStep(STEPS.displayProjects)
  }

  function viewProject(i) {
    setClickedProjectIndex(i);
    setStep(STEPS.viewProject);
  }

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
          editProjectName={editProjectName}
          viewProject={viewProject}
          saveTimesArr={saveTimesArr}
          setSaveTimesArr={setSaveTimesArr}
          logTimesArr={logTimesArr}
          setLogTimesArr={setLogTimesArr}
          startTimesArr={startTimesArr}
          setStartTimesArr={setStartTimesArr}
          clickedProjectIndex={clickedProjectIndex}
        />

      case STEPS.updateProjectName:
        return <UpdateProjectName
          saveProjectNameInput={saveProjectNameInput}
          setSaveProjectNameInput={setSaveProjectNameInput}
          confirmEditProjectName={confirmEditProjectName}
          setClickedProjectIndex={setClickedProjectIndex}
        />

      case STEPS.viewProject:
        return <ViewProject
          saveProjectsArr={saveProjectsArr}
          clickedProjectIndex={clickedProjectIndex}
          setClickedProjectIndex={setClickedProjectIndex}
          saveTimesArr={saveTimesArr}
          setSaveTimesArr={setSaveTimesArr}
          logTimesArr={logTimesArr}
          setLogTimesArr={setLogTimesArr}
          startTimesArr={startTimesArr}
          setStartTimesArr={setStartTimesArr}
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