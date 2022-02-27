import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AuthButtons from "./AuthButtons/AuthButtons";
import classes from "./Header.module.css";
import NavList from "./NavButtons/NavList";
import UserIcon from "./ProfileMenu/UserIcon";

const Header = () => {
  const authenticated = useSelector((state) => state.auth.authenticated);
  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <Link to="/">
          <h1 className={classes.title}>My Diary</h1>
        </Link>
        {authenticated && <NavList />}
        {authenticated && <UserIcon />}
        {!authenticated && <AuthButtons />}
      </nav>
    </header>
  );
};

export default Header;
