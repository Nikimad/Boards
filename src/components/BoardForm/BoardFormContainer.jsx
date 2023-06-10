import { useContext } from "react";
import HiddableContentContext from "../../context/HiddableContentContext";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { boardByIdSelector } from "../../models/boards/boardsSelectors";
import useAction from "../../hooks/useAction";
import {
  addBoard,
  editBoard,
  removeBoard,
} from "../../models/boards/boardsSlice";
import * as Yup from "yup";
import { Formik } from "formik";
import Modal from "../Modal";
import BoardForm from "./BoardForm";

const BoardFormContainer = () => {
  const { toggleIsHidden } = useContext(HiddableContentContext);

  const navigate = useNavigate();
  const { boardId, action } = useParams();

  const board = useSelector(boardByIdSelector(boardId));

  const dispatchSubmitAction = useAction(
    action === "edit" ? editBoard : addBoard
  );
  const dispatchRemoveBoard = useAction(removeBoard);

  const onSubmit = (values) => dispatchSubmitAction(values);
  const onReset = () => {
    navigate("/");
    toggleIsHidden();
    dispatchRemoveBoard(board);
  };

  return (
    <Modal>
      <Formik
        initialValues={
          board ?? {
            id: +boardId,
            title: "",
            tasksIds: [],
          }
        }
        validationSchema={Yup.object({
          title: Yup.string()
            .min(5, "Title must be 5 characters or more")
            .max(16, "Title must be 16 characters or less")
            .required("Title is required"),
        })}
        onSubmit={onSubmit}
        onReset={onReset}
      >
        <BoardForm isEdit={action === "edit"} />
      </Formik>
    </Modal>
  );
};

export default BoardFormContainer;
