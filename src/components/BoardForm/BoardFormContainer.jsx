import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useAction from "../../hooks/useAction";
import useModal from "../../hooks/useModal";
import { boardsDomainSelectors } from "../../models/boardsDomain/boardsDomainSelectors";
import {
  addBoard,
  editBoard,
  deleteBoard,
} from "../../models/boardsDomain/boardsDomainThunks";
import * as Yup from "yup";
import { Formik } from "formik";
import Modal from "../Modal";
import BoardForm from "./BoardForm";

const BoardFormContainer = () => {
  const modalProps = useModal();
  const navigate = useNavigate();
  const { boardId } = useParams();
  const [searchParams] = useSearchParams();

  const board = useSelector((state) =>
    boardsDomainSelectors.selectById(state, boardId)
  );

  const dispatchSubmitAction = useAction(
    Boolean(boardId) ? editBoard : addBoard
  );

  const dispatchRemoveBoard = useAction(deleteBoard);

  const query = searchParams.get("board")

  const hanldeSubmit = (values) => {
    dispatchSubmitAction({
      board: values,
      searchParams: query,
    });
    modalProps.resetModal();
  };

  const handleRemove = () => {
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
    >
      <Modal modalProps={modalProps}>
        <BoardForm isEdit={Boolean(boardId)} onRemove={handleRemove} />
      </Modal>
    </Formik>
  );
};

export default BoardFormContainer;
