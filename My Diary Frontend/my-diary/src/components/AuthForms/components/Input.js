import classes from "./Input.module.css";

const Input = (props) => {
  const error = props.error;
  let className = classes.input;
  if (error) {
    className += ` ${classes.error}`;
  }
  return (
    <div className={classes.formField}>
      <input
        type={props.type}
        placeholder={props.placeholder}
        required={props.required}
        className={className}
        minLength="6"
        value={props.value}
        onChange={(event) => props.onChange(event.target.value)}
        onFocus={props.onFocus}
        name={props.name}
      />
      {error && <p className={classes.errorText}>{error}</p>}
    </div>
  );
};

export default Input;
