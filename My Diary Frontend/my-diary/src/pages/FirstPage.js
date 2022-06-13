import { useSelector } from "react-redux";

const FirstPage = () => {
  const token = useSelector((state) => state.auth.token);
  const sendTestRequest = async () => {
    const response = await fetch("/test", {
      headers: {
        Authorization: "Bearer" + token,
      },
    });
    const data = await response.json();
  };

  return <div onClick={sendTestRequest}>First Page</div>;
};

export default FirstPage;
