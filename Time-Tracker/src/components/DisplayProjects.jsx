export const DisplayProjects = ({ saveProjectsArr, setStep, STEPS, setSaveProjectsArr }) => {
  function createProjectFunction() {
    setStep(STEPS.createProject);
  }

  function deleteProject(i) {
    const newArr = [...saveProjectsArr];
    newArr.splice(i, 1);
    setSaveProjectsArr(newArr);
  }

  return (
    <div>
      <button className="add-project-button"
        onClick={createProjectFunction}>Add Project</button>
      {
        saveProjectsArr.length > 0 &&
        saveProjectsArr.map((item, i) => {
          return (
            <div key={i} className="display-projects-container">
              <p>{item}</p>
              <button>
                <img src="../../public/edit.png" alt="edit button" />
              </button>
              <button onClick={() => deleteProject(i)}>
                <img src="../../public/delete.png" alt="delete button" />
              </button>
            </div>
          );
        })
      }
    </div>
  );
}