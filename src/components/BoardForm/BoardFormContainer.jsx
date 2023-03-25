import { Formik } from "formik";
import BoardForm from "./BoardForm";
import getBoardFormProps from "../../helpers/getBoardFormProps";

const BoardFormContainer = ({ initialValues, onSubmit, ...props }) => {
  return (
    <Formik
      {...getBoardFormProps(initialValues)}
      onSubmit={(values) => onSubmit(values)}
    >
      <BoardForm {...props} />
    </Formik>
  );
};

export default BoardFormContainer;
