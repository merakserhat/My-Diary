import classes from "../AuthForms.module.css";

const TitlePanel = (props) => {
  return (
    <div className={classes.titlePanel}>
      <h2>{props.title}</h2>
    </div>
  );
};

export default TitlePanel;
