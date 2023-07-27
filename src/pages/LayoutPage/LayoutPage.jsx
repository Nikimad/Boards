import { useSearchParams, Outlet, Navigate } from "react-router-dom";
import { useGetBoardsQuery } from "../../redux/services/boardsApi";
import Navbar from "../../components/Navbar";
import Layout from "../../components/Layout";

const LayoutPageContainer = () => {
  const [searchParams] = useSearchParams();
  const boardSearchParams = searchParams.get("board");
  const { data = [], isLoading, isError } = useGetBoardsQuery(boardSearchParams);
  

  return (
    <Layout>
      { isError ? <Navigate to="error" /> :
        <Navbar boards={data} searchParams={boardSearchParams} isLoading={isLoading} /> 
      }
      <Outlet />
    </Layout>
  );
};

export default LayoutPageContainer;
