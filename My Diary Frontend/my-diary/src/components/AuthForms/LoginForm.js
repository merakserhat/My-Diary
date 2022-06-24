import { Link } from "react-router-dom";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./AuthForms.module.css";
import ChangeAuthType from "./components/ChangeAuthType";
import Input from "./components/Input";
import MessageBox from "./components/MessageBox";
import TitlePanel from "./components/TitlePanel";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

const LoginForm = ({ isLoading, message, onValidSubmit }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  const submitHandler = (data, e) => {
    console.log("data", data);
    onValidSubmit(data);
  };

  return (
    <div className={classes.card}>
      {isLoading && <LoadingSpinner />}
      <TitlePanel title="Log in" />
      {message && <MessageBox message={message} />}
      <div className={classes.formPanel}>
        <form onSubmit={handleSubmit(submitHandler)}>
          <Input
            type="email"
            placeholder="Enter e-mail"
            register={register("email", {
              required: "E mail can not be empty",
            })}
            required
            error={errors.email}
          />
          <Input
            type="password"
            placeholder="Enter password"
            register={register("password", {
              required: "Password can not be empty",
              minLength: {
                value: 6,
                message: "This password is too short.",
              },
            })}
            required
            error={errors.password}
          />
          <div className={classes.forgetContent}>
            <span>
              Forgot <Link to="/auth/forgotten">password?</Link>
            </span>
          </div>
          <div className={classes.formField}>
            <button>Log in</button>
          </div>

          <ChangeAuthType
            type="register"
            message="Don't have an account?"
            linkTitle="REGISTER NOW"
          />
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
