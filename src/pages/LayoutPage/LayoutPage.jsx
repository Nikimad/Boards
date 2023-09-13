import { useEffect } from "react";
import { useSearchParams, Outlet, useNavigate } from "react-router-dom";
import useAction from "../../hooks/useAction";
import {
  boardsSelectors,
  boardsActions,
} from "../../redux/slices/boards/boardsSlice";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import Layout from "../../components/Layout";
import Header from "../../components/Header";

const LayoutPageContainer = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const boardSearchParams = searchParams.get("board");

  const getBoards = useAction(boardsActions.getBoards);

  const isError = useSelector(boardsSelectors.selectIsError);

  useEffect(() => {
    getBoards(boardSearchParams);
  }, [getBoards, boardSearchParams]);

  useEffect(() => {
    if (isError) navigate("/error");
  }, [isError, navigate]);

  return (
    <Layout>
      <Navbar />
      <Header />
      <Outlet />
    </Layout>
  );
};

export default LayoutPageContainer;
