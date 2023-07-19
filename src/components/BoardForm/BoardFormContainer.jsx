import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useAction from "../../hooks/useAction";
import useModal from "../../hooks/useModal";
import * as Yup from "yup";
import { boardsSelectors } from "../../models/boards/boardsSelectors";
import {
  postBoard,
  deleteBoard,
  patchBoard,
} from "../../models/boards/boardsThunks";
import { Formik } from "formik";
import Modal from "../Modal";
import BoardForm from "./BoardForm";

const BoardFormContainer = () => {
  const modalProps = useModal();
  const navigate = useNavigate();
  const { boardId } = useParams();
  const { state } = useLocation();
  const previousSearchParams = new URLSearchParams(
    state?.previousLocation.search
  );

  const board = useSelector((state) =>
    boardsSelectors.selectById(state, boardId)
  );

  const dispatchSubmitAction = useAction(
    Boolean(boardId) ? patchBoard : postBoard
  );

  const dispatchRemoveBoard = useAction(deleteBoard);

  const hanldeSubmit = (values) => {
    dispatchSubmitAction({
      board: values,
      searchParams: previousSearchParams.get("board"),
    });
    modalProps.resetModal();
  };

  const handleRemove = () => {
    dispatchRemoveBoard(board.id);
    navigate("/");
    modalProps.resetModal();
  };

  return (
    <Formik
      initialValues={
        board ?? {
          title: "",
          id: Date.now(),
        }
      }
      validationSchema={Yup.object({
        title: Yup.string()
          .min(5, "Title must be 5 characters or more")
          .max(16, "Title must be 16 characters or less")
          .required("Title is required"),
      })}
      onSubmit={hanldeSubmit}
    >
      <Modal modalProps={modalProps}>
        <BoardForm isEdit={Boolean(boardId)} onRemove={handleRemove} />
      </Modal>
    </Formik>
  );
};

export default BoardFormContainer;
