/**
 * Converts a date string to a readable format
 * @param date - The date to be converted
 * @returns A string representing the date in a readable format
 */
const readableDateJoined = (date: string) => {
  const myDate = new Date(date);
  return myDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });
};

export { readableDateJoined };
