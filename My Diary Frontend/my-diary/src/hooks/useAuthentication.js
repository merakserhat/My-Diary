import { useCallback } from "react";
import useHttps from "./use-https";

const useAuthentication = () => {
  const { sendRequest, isLoading, error, unsubscribe } = useHttps();

  const login = async (email, password) => {
    const url = "/auth/login";
    const config = {
      url,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        email,
        password,
      },
    };
    const data = await sendRequest(config);
    return data;
  };

  const register = async (email, password) => {
    const url = "/auth/register";
    const config = {
      url,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        email,
        password,
      },
    };
    const data = await sendRequest(config);
    return data;
  };

  const getResetLink = async (email) => {
    const url = "/auth/get-reset-link";
    const config = {
      url,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        email,
      },
    };
    const data = await sendRequest(config);
    return data;
  };

  const validateResetToken = useCallback(
    async (token) => {
      const url = "/auth/validate-reset-token";
      const config = {
        url,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          token,
        },
      };
      const data = await sendRequest(config);
      return data;
    },
    [sendRequest]
  );

  const resetPassword = async (password, token) => {
    const url = "/auth/reset-password";
    const config = {
      url,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        password,
        token,
      },
    };
    const data = await sendRequest(config);
    return data;
  };

  return {
    login,
    register,
    getResetLink,
    validateResetToken,
    resetPassword,
    isLoading,
    error,
    unsubscribe,
  };
};

export default useAuthentication;
