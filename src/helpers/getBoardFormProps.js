import * as Yup from "yup";

const getBoardFormProps = (
  initialValues = {
    title: "",
  }
) => ({
  initialValues,
  validationSchema: Yup.object({
    title: Yup.string()
      .min(5, "Title must be 5 characters or more")
      .max(16, "Title must be 16 characters or less")
      .required("Title is required"),
  }),
});

export default getBoardFormProps;
