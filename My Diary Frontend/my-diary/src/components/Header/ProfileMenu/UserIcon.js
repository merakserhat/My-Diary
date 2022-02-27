import { useSelector } from "react-redux";
import icon from "../../../images/user.png";
import DropdownMenu from "./DropdownMenu";
import classes from "./UserIcon.module.css";

const UserIcon = () => {
  const userName = useSelector((state) => state.auth.userName);
  return (
    <div className={classes.iconContainer}>
      <span>{userName}</span>
      <img src={icon} alt="User" className={classes.icon} />
      <div className={classes.dropdownContainer}>
        <DropdownMenu />
      </div>
    </div>
  );
};

export default UserIcon;
