import { Formik } from "formik";
import BoardForm from "./BoardForm";
import getBoardFormProps from "../../helpers/getBoardFormProps";

const BoardFormContainer = ({
  initialValues,
  onSubmit,
  onRemove,
  ...props
}) => {
  return (
    <Formik
      {...getBoardFormProps(initialValues)}
      onSubmit={(values) => onSubmit(values)}
    >
      <BoardForm {...props} onRemove={onRemove} />
    </Formik>
  );
};

export default BoardFormContainer;
