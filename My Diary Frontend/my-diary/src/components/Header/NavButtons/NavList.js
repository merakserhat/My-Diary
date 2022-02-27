import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router";
import classes from "./NavList.module.css";

const setUrlWithSearchParams = (location, pathname, setState) => {
  if (location.pathname.includes(pathname)) {
    setState(location.pathname + location.search);
  } else {
    setState(pathname);
  }
};

const NavList = () => {
  const [writingUrl, setWritingUrl] = useState("/diary/write");
  const location = useLocation();

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      setUrlWithSearchParams(location, "/diary/write", setWritingUrl);
    }

    return () => (mounted = false);
  }, [location]);

  return (
    <nav className={classes.nav}>
      <NavLink to="/diary/" exact activeClassName={classes.active}>
        Diary List
      </NavLink>
      <NavLink to={writingUrl} activeClassName={classes.active}>
        Write
      </NavLink>
    </nav>
  );
};

export default NavList;
