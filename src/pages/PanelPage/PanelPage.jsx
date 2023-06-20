import Panel from "../../components/Panel";
import Plug from "../../components/Plug";
import Board from "../../components/Board";
import Task from "../../components/Task";

const pagesMap = {
  plug: Plug,
  board: Board,
  task: Task,
};

const PanelPage = ({ name, ...props }) => (
  <Panel>{pagesMap[name](props)}</Panel>
);

export default PanelPage;
