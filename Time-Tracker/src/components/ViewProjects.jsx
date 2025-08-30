import { useState, useEffect } from "react";
import { StartTime } from "./StartTime.jsx";
import { StopTime } from "./StopTime.jsx";

export const ViewProject = ({ saveProjectsArr, clickedProjectIndex, setClickedProjectIndex, saveTimesArr, setSaveTimesArr, logTimesArr, setLogTimesArr, startTimesArr, setStartTimesArr }) => {
  const [isRunning, setIsRunning] = useState(false);
  const date = new Date();
  const [clockTime, setClockTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  function toggleTimer() {
    setIsRunning(prev => !prev);
  }

  useEffect(() => {
    const length = saveProjectsArr.length;

    if(saveTimesArr.length < length) {
      setSaveTimesArr(prev => [
        ...prev,
        ...Array(length - prev.length).fill([])
      ]);
    }

    if(logTimesArr.length < length) {
      setLogTimesArr(prev => [
        ...prev,
        ...Array(length - prev.length).fill([])
      ])
    } 

    if(startTimesArr.length < length) {
      setStartTimesArr(prev => [
        ...prev,
        ...Array(length - prev.length).fill([])
      ])
    }
  }, [saveProjectsArr]);

  useEffect(() => {
    if (!isRunning && (clockTime.seconds > 0 || clockTime.minutes > 0 || clockTime.hours > 0)) {
      const newObj = { ...clockTime };
      setSaveTimesArr(prev => {
        return prev.map((projectTimes, i) => {
          if (i === clickedProjectIndex) {
            return [...projectTimes, newObj];
          } else {
            return projectTimes;
          }
        });
      });

      setClockTime(prev => ({
        hours: 0,
        minutes: 0,
        seconds: 0
      }));

      const logObj = {
        logTime: date.toDateString(),
        hours: date.getHours(),
        minutes: date.getMinutes()
      };

      setLogTimesArr(prev => {
        return prev.map((logTimes, i) => {
          if(i === clickedProjectIndex) {
            return [...logTimes, logObj];
          } else {
            return logTimes;
          }
        });
      });
    }

    if (isRunning) {
      const logObj = {
        hours: date.getHours(),
        minutes: date.getMinutes()
      };

      setStartTimesArr(prev => {
        return prev.map((startTimes, i) => {
          if(i === clickedProjectIndex) {
            return [...startTimes, logObj];
          } else {
            return startTimes;
          }
        });
      });
    }
  }, [isRunning]);

  useEffect(() => {
    localStorage.setItem('timeRecords', JSON.stringify(saveTimesArr));
  }, [saveTimesArr]);

  useEffect(() => {
    localStorage.setItem('logTimesArr', JSON.stringify(logTimesArr));
  }, [logTimesArr]);

  useEffect(() => {
    localStorage.setItem('startTimesArr', JSON.stringify(startTimesArr));
  }, [startTimesArr]);

  return (
    <div className="view-project-container">
      <p className="project-name-paragraph">
        {saveProjectsArr[clickedProjectIndex]}
      </p>

      {
        isRunning &&
        <StartTime
          isRunning={isRunning}
          clockTime={clockTime}
          setClockTime={setClockTime}
        />
      }

      {
        !isRunning &&
        <StopTime
          saveTimesArr={saveTimesArr}
          setSaveTimesArr={setSaveTimesArr}
          logTimesArr={logTimesArr}
          setLogTimesArr={setLogTimesArr}
          startTimesArr={startTimesArr}
          setStartTimesArr={setStartTimesArr}
          clickedProjectIndex={clickedProjectIndex}
          setClickedProjectIndex={setClickedProjectIndex}
        />
      }

      <button className="start-time-button" onClick={toggleTimer}>
        {isRunning ? "Stop TIme" : "Start Time"}
      </button>
    </div>
  );
}