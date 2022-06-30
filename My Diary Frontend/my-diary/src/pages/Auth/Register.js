import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import ChangeAuthType from "../../components/AuthForms/components/ChangeAuthType";
import Input from "../../components/AuthForms/components/Input";
import TitlePanel from "../../components/AuthForms/components/TitlePanel";
import RegisterForm from "../../components/AuthForms/RegisterForm";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import useAuthentication from "../../hooks/useAuthentication";
import useErrorHandler from "../../hooks/useErrorHandler";
import { register } from "../../store/auth/authActions";
import classes from "./AuthForms.module.css";

const Register = ({ registerFunc, isLoading }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    getValues,
  } = useForm({
    defaultValues: { email: "", password: "", validatePassword: "" },
  });

  const history = useHistory();

  const formSubmitHandler = async (formData) => {
    registerFunc(
      formData,
      () => {
        history.push({
          pathname: "/auth/login",
          search: `?message=success register`,
        });
      },
      (error) => {
        setError(error.error?.type, {
          type: "custom",
          message: error.error?.message,
        });
      }
    );
  };

  return (
    <div className={classes.card}>
      {isLoading && <LoadingSpinner />}

      <TitlePanel title="Register" />
      <div className={classes.formPanel}>
        <form onSubmit={handleSubmit(formSubmitHandler)}>
          <Input
            type="email"
            placeholder="Enter e-mail"
            required
            register={register("email", {
              required: "E mail can not be empty",
            })}
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
          <Input
            type="password"
            placeholder="Validate password"
            register={register("validatePassword", {
              required: "Password can not be empty",
              validate: (value) =>
                value === getValues("password") || "Passwords must be equal",
            })}
            required
            error={errors.validatePassword?.message}
          />

          <div className={classes.formField}>
            <button>Register</button>
          </div>
          <ChangeAuthType
            type="login"
            message="Already have an account?"
            linkTitle="Log in"
          />
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = ({ auth }) => ({
  isLoading: auth?.isLoading || false,
});

const mapDispatchToProps = { registerFunc: register };

export default connect(mapStateToProps, mapDispatchToProps)(Register);
