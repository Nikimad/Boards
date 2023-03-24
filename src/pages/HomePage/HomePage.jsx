import Wrapper from "../../components/Wrapper";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import TasksPanel from "../../components/TasksPanel";

const HomePage = () => (
  <Wrapper>
    <Sidebar />
    <Header />
    <TasksPanel />
  </Wrapper>
);

export default HomePage;
