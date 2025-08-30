import { useEffect } from "react";

export function StartTime({ isRunning, clockTime, setClockTime }) {

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setClockTime(prev => ({
          ...prev,
          seconds: prev.seconds + 1
        }));
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    if (clockTime.seconds > 2) {
      setClockTime(prev => ({
        ...prev,
        minutes: prev.minutes + 1,
        seconds: 0
      }))
    }
  }, [clockTime.seconds]);

  useEffect(() => {
    if (clockTime.minutes > 2) {
      setClockTime(prev => ({
        ...prev,
        hours: prev.hours + 1,
        minutes: 0
      }))
    }
  }, [clockTime.minutes]);

  return (
    <div className="timer-container">
      {String(clockTime.hours).padStart(2, '0')}:&nbsp;
      {String(clockTime.minutes).padStart(2, '0')}:&nbsp;
      {String(clockTime.seconds).padStart(2, '0')}
    </div>
  );
}