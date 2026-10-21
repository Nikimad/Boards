import { useNavigate } from "react-router";
import useModal from "../../hooks/useModal";
import * as Yup from "yup";
import { Formik } from "formik";
import type { Board } from "../../types";
import Modal from "../Modal";
import BoardForm from "./BoardForm";

const validationSchema = Yup.object({
  title: Yup.string()
    .min(5, "Title must be 5 characters or more")
    .max(16, "Title must be 16 characters or less")
    .required("Title is required"),
});

// on edit the form is initialized with the whole board, so `id` reaches onSubmit
export type BoardFormValues = Yup.InferType<typeof validationSchema> & Partial<Pick<Board, "id">>;

interface BoardFormContainerProps {
  board?: Board;
  onSubmit: (values: BoardFormValues) => void;
  onDelete?: (id: number) => void;
}

const BoardFormContainer = ({ board, onSubmit, onDelete }: BoardFormContainerProps) => {
  const modalProps = useModal();
  const navigate = useNavigate();

  const hanldeSubmit = (values: BoardFormValues) => {
    onSubmit(values);
    modalProps.resetModal();
  };

  // Remove is rendered only when `board` exists, and edit page always passes onDelete
  const handleRemove = () => {
    onDelete!(board!.id);
    navigate("/");
    modalProps.resetModal();
  };

  return (
    <Formik<BoardFormValues>
      enableReinitialize
      initialValues={
        board ?? {
          title: "",
        }
      }
      validationSchema={validationSchema}
      onSubmit={hanldeSubmit}
    >
      <Modal modalProps={modalProps}>
        <BoardForm isEdit={Boolean(board)} onRemove={handleRemove} />
      </Modal>
    </Formik>
  );
};

export default BoardFormContainer;
