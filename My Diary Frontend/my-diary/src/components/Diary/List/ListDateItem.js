import classes from "./ListDateItem.module.css";
import { mmddyyyytoCustomDateObject } from "../../../utils/date-utils";

const ListDateItem = (props) => {
  const customDateObject = mmddyyyytoCustomDateObject(props.date);

  return (
    <div className={classes.dateItem}>
      <span className={classes.day}>{customDateObject.day}</span>
      <span className={classes.month}>{customDateObject.monthLong}</span>
      <span className={classes.year}>{customDateObject.year}</span>
    </div>
  );
};

export default ListDateItem;
