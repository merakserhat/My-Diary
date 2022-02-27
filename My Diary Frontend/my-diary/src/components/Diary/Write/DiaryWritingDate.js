import { useState } from "react";
import classes from "./DiaryWritingDate.module.css";

const DiaryWritingDate = (props) => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const activeString = getDateString(props.isToday ? today : yesterday);
  const hiddenString = getDateString(!props.isToday ? today : yesterday);

  return (
    <div className={classes.dateHolder}>
      <div className={classes.activeDate}>{activeString}</div>
      <div onClick={props.onChangeDate} className={classes.hiddenDate}>
        {hiddenString}
      </div>
    </div>
  );
};

const getDateString = (date) => {
  return `${date.toLocaleString("en-US", {
    day: "2-digit",
  })} ${date.toLocaleString("en-US", { month: "long" })} ${date.getFullYear()}`;
};

export default DiaryWritingDate;
