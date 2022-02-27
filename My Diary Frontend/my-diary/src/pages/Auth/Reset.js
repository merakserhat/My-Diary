import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import ResetForm from "../../components/AuthForms/ResetForm";
import useAuthentication from "../../hooks/useAuthentication";
import useErrorHandler from "../../hooks/useErrorHandler";

const Reset = () => {
  const params = useParams();
  const token = params.token;
  const { validateResetToken, resetPassword, unsubscribe, isLoading, error } =
    useAuthentication();
  useErrorHandler(error);

  const [tokenError, setTokenError] = useState();
  const [isSuccessfullyFinished, setIsSuccessfullyFinished] = useState(false);

  const handleTokenValidationErrors = useCallback((error) => {
    switch (error.type) {
      case "token expired":
        setTokenError(
          "This link is expired. Please get a new link to reset your password!"
        );

        break;
      case "invalid token":
        setTokenError("This link is not valid. Please check the link!");

        break;
      default: {
        setTokenError("Something went wrong! Please try again.");
      }
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    const validateToken = async () => {
      const data = await validateResetToken(token);
      if (!data && !mounted) return;

      if (data.error) {
        handleTokenValidationErrors(data.error);
        console.log(data);
      } else {
        console.log(data);
      }
    };

    validateToken();

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, [validateResetToken, token, unsubscribe, handleTokenValidationErrors]);

  const onValidSubmit = async (password) => {
    const data = await resetPassword(password, token);
    if (!data) return;

    if (data.error) {
      handleTokenValidationErrors(data.error);
    } else {
      setIsSuccessfullyFinished(true);
    }
  };

  return (
    <React.Fragment>
      <ResetForm
        onValidSubmit={onValidSubmit}
        isLoading={isLoading}
        tokenError={tokenError}
        isSuccessfullyFinished={isSuccessfullyFinished}
      />
    </React.Fragment>
  );
};

export default Reset;
