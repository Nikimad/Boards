import Modal from "../Modal";
import BoardForm from "../BoardForm";

const EditBoard = ({ modalProps, initialValues, onSubmit, onRemove }) => (
  <Modal {...modalProps}>
    <BoardForm
      formTitle="Edit Board"
      {...{ initialValues, onSubmit, onRemove }}
    />
  </Modal>
);

export default EditBoard;
