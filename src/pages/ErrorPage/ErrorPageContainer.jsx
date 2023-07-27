import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ErrorPage from "./ErrorPage";

const ErrorPageContainer = () => {
  const navigate = useNavigate();
 
  useEffect(() => {
    const timerId = setTimeout(() => navigate("/"), 2000);
    return () => {
      clearTimeout(timerId);
    };
  }, [navigate]);

  return <ErrorPage />;
};

export default ErrorPageContainer;
