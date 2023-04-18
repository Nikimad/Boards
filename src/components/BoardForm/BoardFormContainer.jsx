import { Formik } from "formik";
import * as Yup from "yup";
import BoardForm from "./BoardForm";

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

export default BoardFormContainer;
