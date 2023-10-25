/// gives us a string like "2 days ago" or "a year ago"

export const timeAgo = (date: string) => {
  const time = new Date(date).getTime();
  const now = new Date().getTime();
  const diff = now - time > 0 ? now - time : time - now;
  const seconds = diff / 1000;
  const minutes = seconds / 60;
  const hours = minutes / 60;
  let ret = "";
  if (hours < 24) {
    ret = `${Math.floor(hours)} hours ago`;
  } else if (hours < 48) {
    ret = `a day ago`;
  } else if (hours < 24 * 30) {
    ret = `${Math.floor(hours / 24)} days ago`;
  } else if (hours < 24 * 60) {
    ret = `a month ago`;
  } else if (hours < 24 * 365) {
    ret = `${Math.floor(hours / 24 / 30)} months ago`;
  } else if (hours < 24 * 365 * 2) {
    ret = `a year ago`;
  } else {
    ret = `${Math.floor(hours / 24 / 365)} years ago`;
  }
  // handle if the date is in the future
  if (now - time < 0) {
    ret = "in " + ret.substring(ret.startsWith("-") ? 1 : 0, ret.length - 4);
  }
  return ret;
};
