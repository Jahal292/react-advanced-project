export const getDate = (dateToChange) => {
    const dateObject = new Date(dateToChange);
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1;
    const day = dateObject.getDate();
    const formattedDate = `${day}/${month}/${year}`;

    return <>{formattedDate}</>;
  };