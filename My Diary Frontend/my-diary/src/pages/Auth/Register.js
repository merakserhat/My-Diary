import { useHistory } from "react-router";
import RegisterForm from "../../components/AuthForms/RegisterForm";
import useAuthentication from "../../hooks/useAuthentication";
import useErrorHandler from "../../hooks/useErrorHandler";

const Register = () => {
  const { register, isLoading, error } = useAuthentication();
  useErrorHandler(error);
  const history = useHistory();

  const formSubmitHandler = async (formData) => {
    const data = await register(formData.email, formData.password);
    if (!data) return;

    if (data.error) {
      handleErrors(data.error);
    } else {
      history.push({
        pathname: "/auth/login",
        search: `?message=success register`,
      });
    }
  };

  let dispatchError;

  const setDispatchError = (dispatch) => {
    dispatchError = dispatch;
  };

  const handleErrors = (error) => {
    if (!dispatchError) {
      return;
    }
    dispatchError({
      type: error.type,
      message: error.message,
    });
  };

  return (
    <RegisterForm
      onValidSubmit={formSubmitHandler}
      setDispatchError={setDispatchError}
      isLoading={isLoading}
    />
  );
};

export default Register;
