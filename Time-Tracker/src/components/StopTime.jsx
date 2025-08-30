export const StopTime = ({ saveTimesArr, logTimesArr, startTimesArr, clickedProjectIndex, setSaveTimesArr, setLogTimesArr, setStartTimesArr, setClickedProjectIndex }) => {
  function deleteButton(i) {
    //setClickedProjectIndex(i);
    const newSaveTimesArr = [...saveTimesArr];
    const newlogTimesArr = [...logTimesArr];
    const newstartTimesArr = [...startTimesArr];

    newSaveTimesArr[clickedProjectIndex].splice(i, 1);
    setSaveTimesArr(newSaveTimesArr)

    newlogTimesArr[clickedProjectIndex].splice(i, 1);
    setLogTimesArr(newlogTimesArr);

    newstartTimesArr[clickedProjectIndex].splice(i, 1);
    setStartTimesArr(newstartTimesArr);
  }

  return (
    <div>
      {
        saveTimesArr[clickedProjectIndex] &&
        saveTimesArr[clickedProjectIndex].map((item, i) => {
          return (
            <div key={i} className="times-container">
              <div className="times-2-container">
                <div className="times-date-container">
                  <p className="times-date-clock">
                    {String(item.hours).padStart(2, '0')}:
                    {String(item.minutes).padStart(2, '0')}:
                    {String(item.seconds).padStart(2, '0')}
                  </p>
                  <p className="log-time">
                    {logTimesArr[clickedProjectIndex][i].logTime}
                  </p>
                </div>
                <p className="times-time-clock">
                  {String(startTimesArr[clickedProjectIndex][i].hours).padStart(2, '0')}:
                  {String(startTimesArr[clickedProjectIndex][i].minutes).padStart(2, '0')}:&nbsp;
                  to&nbsp;&nbsp;
                  {String(logTimesArr[clickedProjectIndex][i].hours).padStart(2, '0')}:
                  {String(logTimesArr[clickedProjectIndex][i].minutes).padStart(2, '0')}
                </p>
              </div>
              <button className="delete-button"
                onClick={() => deleteButton(i)}>
                Delete
              </button>
            </div>
          );
        })
      }
    </div>
  );
}