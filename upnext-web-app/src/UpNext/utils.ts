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

/**
 * Converts an ISO date string to a readable format in MM/DD/YYYY
 * @param isoDateString - The ISO date string to be converted
 * @returns A string representing the date in a readable format
 */
function formatReadableDate(isoDateString: string) {
  const myDate = new Date(isoDateString);

  const year = myDate.getFullYear();
  const month = String(myDate.getMonth() + 1).padStart(2, "0");
  const day = String(myDate.getDate()).padStart(2, "0");
  return `${month}/${day}/${year}`;
}

/**
 * Formats a date string from YYYY-MM-DD to MM/DD/YYYY
 * @param dateString - The date string to be formatted
 * @returns A string representing the date in MM/DD/YYYY format
 */
function formatDateString(dateString: string) {
  return `${dateString.slice(5, 7)}/${dateString.slice(
    8,
    10
  )}/${dateString.slice(0, 4)}`;
};

export { readableDateJoined, formatReadableDate, formatDateString };
