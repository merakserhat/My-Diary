import LoginForm from "../../components/AuthForms/LoginForm";
import useAuthentication from "../../hooks/useAuthentication";
import { useHistory, useLocation } from "react-router";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/AuthReducer";
import useErrorHandler from "../../hooks/useErrorHandler";

const getUrlMessage = (location) => {
  const queryParams = new URLSearchParams(location.search);
  if (queryParams.get("message") === "success register") {
    return `You have registered successfully! Please log in.`;
  }
};

const Login = () => {
  const { login, isLoading, error } = useAuthentication();
  useErrorHandler(error);

  const location = useLocation();
  const history = useHistory();
  const dispatchAuth = useDispatch();

  const message = getUrlMessage(location);

  const formSubmitHandler = async (formData) => {
    const data = await login(formData.email, formData.password);
    if (!data) return;
    if (data.error) {
      handleErrors(data.error);
    } else {
      //expiresIn
      const { email, token } = data;
      dispatchAuth(authActions.setAuthenticate({ email, token }));
      history.push("/diary");
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
    <LoginForm
      message={message}
      onValidSubmit={formSubmitHandler}
      isLoading={isLoading}
      setDispatchError={setDispatchError}
    />
  );
};

export default Login;
