const timeStamp = (d) => {
  let elapsed = Date.now() - d;
  console.log("\ntime since", d, "is:", elapsed);
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  if (elapsed < minute) {
    return `${Math.floor(elapsed / second)} seconds ago`;
  } else if (elapsed < hour) {
    return `${Math.floor(elapsed / minute)} minutes ago`;
  } else if (elapsed < day) {
    return `${Math.floor(elapsed / hour)} hours ago`;
  } else if (elapsed < week) {
    return `${Math.floor(elapsed / day)} days ago`;
  } else {
    return d.toDateString();
  }
};

module.exports = timeStamp;
