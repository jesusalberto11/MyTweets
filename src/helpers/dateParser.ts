export const formatDate = (tweetDate: string): string => {
  const date = new Date(tweetDate);

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const month = date.toLocaleString("en-us", { month: "long" });
  const day = date.getDate();
  const year = date.getFullYear();
  const ampm = hours >= 12 ? "pm" : "am";

  const formattedHours = hours % 12 || 12;

  const timeString = `${formattedHours}:${
    minutes < 10 ? "0" : ""
  }${minutes} ${ampm}`;

  const dateString = `${day} ${month}, ${year}`;

  return `${timeString} - ${dateString}`;
};
