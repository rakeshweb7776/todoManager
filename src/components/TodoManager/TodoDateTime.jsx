import React, { useState, useEffect } from 'react';

const TodoDateTime = () => {
  /* State to store current date & time Updates every second */
  const [dateTime, setDateTime] = useState();
  /* ================================
     Function to get current date & time
     ================================ */
  const getDateTime = () => {
    const now = new Date();

    // Format date (DD/MM/YYYY or locale based)
    const formattedDate = now.toLocaleDateString();

    // Format time (HH:MM:SS)
    const formattedTime = now.toLocaleTimeString();

    // Update state
    setDateTime(`${formattedDate} - ${formattedTime}`);
  };

  /* ================================
       useEffect for setInterval
       Runs once when component mounts
       ================================ */
  useEffect(() => {
    // ✅ Start interval
    const intervalId = setInterval(() => {
      getDateTime();
    }, 1000);

    // ✅ Cleanup interval when component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, []); // empty dependency = run only once
  return <div>{dateTime}</div>;
};
export default TodoDateTime;
