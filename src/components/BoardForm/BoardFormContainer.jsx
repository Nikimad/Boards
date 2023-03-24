import { Formik } from "formik";
import BoardForm from "./BoardForm";
import getBoardFormProps from "../../helpers/getBoardFormProps";
import getId from "../../helpers/getId";

const BoardFormContainer = ({ initialValues, onSubmit, ...props }) => {
  return (
    <Formik
      {...getBoardFormProps(initialValues)}
      onSubmit={(values) =>
        onSubmit("id" in values ? values : { id: getId(), ...values })
      }
    >
      <BoardForm {...props} />
    </Formik>
  );
};

export default BoardFormContainer;
