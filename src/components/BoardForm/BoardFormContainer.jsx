import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useAction from "../../hooks/useAction";
import useModal from "../../hooks/useModal";
import { boardsSelectors } from "../../models/boards/boardsSelectors";
import {
  addBoard,
  editBoard,
  deleteBoard,
} from "../../models/boards/boardsSlice";
import * as Yup from "yup";
import { Formik } from "formik";
import Modal from "../Modal";
import BoardForm from "./BoardForm";

const BoardFormContainer = () => {
  const modalProps = useModal();
  const navigate = useNavigate();
  const { boardId } = useParams();

  const board = useSelector((state) =>
    boardsSelectors.selectById(state, boardId)
  );

  const dispatchSubmitAction = useAction(
    Boolean(boardId) ? editBoard : addBoard
  );

  const dispatchRemoveBoard = useAction(deleteBoard);

  const hanldeSubmit = (values) => {
    dispatchSubmitAction(values);
    modalProps.resetModal();
  };

  const handleReset = () => {
    dispatchRemoveBoard(boardId);
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
      onReset={handleReset}
    >
      <Modal modalProps={modalProps}>
        <BoardForm isEdit={Boolean(boardId)} />
      </Modal>
    </Formik>
  );
};

export default BoardFormContainer;
