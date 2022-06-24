import classes from "./Input.module.css";

const Input = ({
  type,
  placeholder,
  required,
  value,
  onFocus,
  register,
  error,
}) => {
  let className = classes.input;
  if (error) {
    className += ` ${classes.error}`;
  }
  return (
    <div className={classes.formField}>
      <input
        type={type}
        placeholder={placeholder}
        required={required}
        className={className}
        minLength="6"
        {...register}
        value={value}
        onFocus={onFocus}
      />
      {error && <p className={classes.errorText}>{error}</p>}
    </div>
  );
};

export default Input;
