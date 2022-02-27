import classes from "./LoadingSpinner.module.css";

const LoadingSpinner = () => {
  return (
    <div className={classes.holder}>
      <div className={classes.spinner}></div>
    </div>
  );
};

export default LoadingSpinner;
