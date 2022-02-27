import { useHistory } from "react-router";

const useErrorHandler = (error) => {
  const history = useHistory();
  if (error) {
    if (!error.type) {
      history.push("/error");
    }
  }
};

export default useErrorHandler;
