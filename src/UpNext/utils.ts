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

/**
 * Strips HTML tags from a given string.
 * This function uses a regular expression to remove all HTML tags
 * @param html - The HTML string to be stripped of tags.
 * @returns - The stripped string without HTML tags.
 */
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

/**
 * Converts a runtime in minutes to a string in the format "Xh Ym"
 * @param minutes - The runtime in minutes
 * @returns A string representing the runtime in hours and minutes
 */
const convertRuntime = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}m`;
};

export { readableDateJoined, formatReadableDate, formatDateString, stripHtml, convertRuntime };
