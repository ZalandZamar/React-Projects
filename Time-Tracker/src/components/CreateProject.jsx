export const CreateProject = ({ setStep, STEPS, projectName, setProjectName, setSaveProjectsArr }) => {
  function addProjectToStorage() {
    setSaveProjectsArr(prev => [
      ...prev,
      projectName
    ]);

    setProjectName("");
    setStep(STEPS.displayProjects);
  }

  return (
    <div className="create-project-container">
      <input type="text" placeholder="Project name"
        onChange={(e) => setProjectName(e.target.value)} />
      <button onClick={addProjectToStorage}>Create</button>
    </div>
  );
}