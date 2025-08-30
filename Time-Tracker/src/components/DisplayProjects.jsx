export const DisplayProjects = ({ saveProjectsArr, setStep, STEPS, setSaveProjectsArr, editProjectName, viewProject, saveTimesArr, setSaveTimesArr, logTimesArr, setLogTimesArr, startTimesArr, setStartTimesArr, clickedProjectIndex }) => {
  function createProjectFunction() {
    setStep(STEPS.createProject);
  }

  function deleteProject(i) {
    const newArr = [...saveProjectsArr];
    const newSaveTimesArr = [...saveTimesArr];
    const newlogTimesArr = [...logTimesArr];
    const newstartTimesArr = [...startTimesArr];

    newSaveTimesArr.splice(i, 1);
    setSaveTimesArr(newSaveTimesArr);

    newlogTimesArr.splice(i, 1);
    setLogTimesArr(newlogTimesArr);

    newstartTimesArr.splice(i, 1);
    setStartTimesArr(newstartTimesArr);

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
            <div key={item + 1} className="display-projects-container">
              <p>{item}</p>
              <button onClick={() => viewProject(i)}>
                <img src="../../public/view.png" alt="view image" />
              </button>
              <button onClick={() => editProjectName(i)}>
                <img src="../../public/edit.png" alt="edit image" />
              </button>
              <button onClick={() => deleteProject(i)}>
                <img src="../../public/delete.png" alt="delete image" />
              </button>
            </div>
          );
        })
      }
    </div>
  );
}