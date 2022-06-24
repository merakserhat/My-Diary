import ChangePasswordForm from "../../components/AuthForms/ChangePasswordForm";
import useAuthentication from "../../hooks/useAuthentication";
import { useHistory, useLocation } from "react-router";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth/authReducer";
import useErrorHandler from "../../hooks/useErrorHandler";

const ChangePassword = () => {
  const { changePassword, isLoading, error } = useAuthentication();
  useErrorHandler(error);

  const history = useHistory();
  const dispatchAuth = useDispatch();

  const formSubmitHandler = async (formData) => {
    const data = await changePassword(
      formData.oldPassword,
      formData.newPassword
    );
    if (!data) return;
    if (data.error) {
      handleErrors(data.error);
    } else {
      //TODO: successful
      //   const { email, token } = data;
      //   dispatchAuth(authActions.setAuthenticate({ email, token }));
      //   history.push("/diary");
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
    <ChangePasswordForm
      onValidSubmit={formSubmitHandler}
      isLoading={isLoading}
      setDispatchError={setDispatchError}
    />
  );
};
export default ChangePassword;
