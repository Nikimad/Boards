import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import Layout from "../../components/Layout";

const MainPage = () => (
  <Layout>
    <Navbar />
    <Header />
    <Outlet />
  </Layout>
);

export default MainPage;