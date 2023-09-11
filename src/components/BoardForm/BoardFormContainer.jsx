import { useLocation, useNavigate } from "react-router-dom";
import useModal from "../../hooks/useModal";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { Formik } from "formik";
import Modal from "../Modal";
import BoardForm from "./BoardForm";

const BoardFormContainer = ({ board, onSubmit, onDelete }) => {
  const modalProps = useModal();
  const { state: { previousSearchParams } } = useLocation();
  const navigate = useNavigate();

  const hanldeSubmit = (values) => {
    onSubmit({ values, searchParams: previousSearchParams });
    modalProps.resetModal();
  };

  const handleRemove = () => {
    onDelete(board.id);
    navigate("/");
    modalProps.resetModal();
  };

  return (
    <Formik
      enableReinitialize
      initialValues={
        board ?? {
          title: "",
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
        <BoardForm isEdit={Boolean(board)} onRemove={handleRemove} />
      </Modal>
    </Formik>
  );
};

BoardFormContainer.propTypes = {
  board: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
  }),
  onSubmit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default BoardFormContainer;
