import { useState } from "react";
import ForgottenForm from "../../components/AuthForms/ForgottenForm";
import useAuthentication from "../../hooks/useAuthentication";
import useErrorHandler from "../../hooks/useErrorHandler";

const Forgotten = () => {
  const { getResetLink, isLoading, error } = useAuthentication();
  const [isEmailSent, setIsEmailSent] = useState(false);
  useErrorHandler(error);

  const onValidSubmit = async (email) => {
    //send email /TODO: save ven a request is arrived because it can be spam
    const data = await getResetLink(email);
    if (!data) return;

    if (data.error) {
      //andleErrors(data.error);
    } else {
      setIsEmailSent(true);
    }
  };

  return (
    <ForgottenForm
      onValidSubmit={onValidSubmit}
      isLoading={isLoading}
      isEmailSent={isEmailSent}
    />
  );
};

export default Forgotten;
