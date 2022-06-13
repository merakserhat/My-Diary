import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { authActions } from "../../../store/auth/AuthReducer";
import classes from "./DropdownMenu.module.css";

const DropdownMenu = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const dropdown = [
    // {
    //   title: "Profile",
    //   action: () => {},
    // },
    // {
    //   title: "Settings",
    //   action: () => {},
    // },
    {
      title: "Change Password",
      action: () => {
        history.push("/auth/change-password");
      },
    },
    // {
    //   title: "Line",
    // },
    // {
    //   title: "Friends",
    //   action: () => {},
    // },
    // {
    //   title: "Favorites",
    //   action: () => {},
    // },
    {
      title: "Line",
    },
    {
      title: "Log out",
      action: () => {
        dispatch(authActions.logout({}));
      },
    },
  ];
  return (
    <div className={classes.dropdown}>
      {dropdown.map((item, index) =>
        item.title === "Line" ? (
          <div className={classes.line} key={index} />
        ) : (
          <div className={classes.button} onClick={item.action} key={index}>
            {item.title}
          </div>
        )
      )}
    </div>
  );
};

export default DropdownMenu;
