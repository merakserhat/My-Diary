export const mmddyyyytoCustomDateObject = (ISOString) => {
  const date = new Date(ISOString);
  return {
    day: date.toLocaleString("en-US", { day: "2-digit" }),
    dayLong: date.toLocaleString("en-US", { weekday: "long" }),
    dayNarrow: date.toLocaleString("en-US", { weekday: "short" }),
    month: date.toLocaleString("en-US", { month: "2-digit" }),
    monthLong: date.toLocaleString("en-US", { month: "long" }),
    monthNarrow: date.toLocaleString("en-US", { month: "short" }),
    year: date.getFullYear(),
    stringDDMLongYYYY: `${date.toLocaleString("en-US", {
      day: "2-digit",
    })} ${date.toLocaleString("en-US", {
      month: "long",
    })} ${date.getFullYear()}`,
  };
};

export const inputDateTommddyyyy = (inputDateValue) => {
  const date = new Date(inputDateValue);
  return `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
};

export const getDateForInputAtt = (incomingDate, yesterday) => {
  let date = new Date();
  if (incomingDate) {
    date = incomingDate;
  }
  if (yesterday) {
    date.setDate(date.getDate() - 1);
  }
  const dateString = `${date.getFullYear()}-${date.toLocaleString("en-US", {
    month: "2-digit",
  })}-${date.toLocaleString("en-US", { day: "2-digit" })}`;
  return dateString;
};

export const isBeforeYesterday = (date) => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  yesterday.setHours(0, 0, 0, 0);

  return date.getTime() < yesterday.getTime();
};
