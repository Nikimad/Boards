import { Formik } from "formik";
import * as Yup from "yup";
import BoardForm from "./BoardForm";
import PropTypes from 'prop-types';

const BoardFormContainer = ({ initialValues, onSubmit, onReset, ...props }) => {
  return (
    <Formik
      initialValues={{
        title: "",
        ...initialValues,
      }}
      validationSchema={Yup.object({
        title: Yup.string()
          .min(5, "Title must be 5 characters or more")
          .max(16, "Title must be 16 characters or less")
          .required("Title is required"),
      })}
      onSubmit={(values) => onSubmit(values)}
      onReset={() => onReset()}
    >
      <BoardForm {...props} />
    </Formik>
  );
};

BoardFormContainer.propTypes = {
  initialValues: PropTypes.shape({
    title: PropTypes.string
  }),
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
};

export default BoardFormContainer;
