import LoginForm from "../../components/AuthForms/LoginForm";
import { useHistory, useLocation } from "react-router";
import { connect, useDispatch } from "react-redux";
import { login } from "../../store/auth/authActions";
import { useForm } from "react-hook-form";
import classes from "./AuthForms.module.css";
import Input from "../../components/AuthForms/components/Input";
import MessageBox from "../../components/AuthForms/components/MessageBox";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import TitlePanel from "../../components/AuthForms/components/TitlePanel";
import { Link } from "react-router-dom";
import ChangeAuthType from "../../components/AuthForms/components/ChangeAuthType";
import { useEffect } from "react";

const getUrlMessage = (location) => {
  const queryParams = new URLSearchParams(location.search);
  if (queryParams.get("message") === "success register") {
    return `You have registered successfully! Please log in.`;
  }
};

const Login = ({ loginFunc, isLoading }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const location = useLocation();
  const history = useHistory();

  const message = getUrlMessage(location);

  const formSubmitHandler = async (formData) => {
    loginFunc(
      formData,
      () => {
        history.push("/diary");
      },
      (error) => {
        console.log();

        setError(error.error?.type, {
          type: "custom",
          message: error.error?.message,
        });
      }
    );
  };

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  return (
    <div className={classes.card}>
      {isLoading && <LoadingSpinner />}
      <TitlePanel title="Log in" />
      {message && <MessageBox message={message} />}
      <div className={classes.formPanel}>
        <form onSubmit={handleSubmit(formSubmitHandler)}>
          <Input
            type="email"
            placeholder="Enter e-mail"
            register={register("email", {
              required: "E mail can not be empty",
            })}
            required
            error={errors.email?.message}
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
            error={errors.password?.message}
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

const mapStateToProps = ({ auth }) => ({
  isLoading: auth?.isLoading || false,
});

const mapDispatchToProps = { loginFunc: login };

export default connect(mapStateToProps, mapDispatchToProps)(Login);
