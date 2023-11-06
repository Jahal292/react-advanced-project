export const getTime = (timeToChange) => {
    const dateObject = new Date(timeToChange);
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  
    return <>{formattedTime}</>;
  };