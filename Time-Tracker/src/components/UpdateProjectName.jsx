export const UpdateProjectName = ({ saveProjectNameInput, setSaveProjectNameInput, confirmEditProjectName }) => {
  return (
    <div className="create-project-container">
      <input type="text" placeholder="Project name" 
        value={saveProjectNameInput}
        onChange={(e) => {
          setSaveProjectNameInput(e.target.value);
        }}
      />
      <button onClick={confirmEditProjectName}>Update</button>
    </div>
  );
}