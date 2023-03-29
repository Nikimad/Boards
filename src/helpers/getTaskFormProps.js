import * as Yup from "yup";

const getTaskFormProps = (
  initialValues = {
    title: "",
    description: "",
    status: "todo",
  }
) => ({
  initialValues,
  validationSchema: Yup.object({
    title: Yup.string()
      .max(30, "Title must be 30 characters or less")
      .required("Title is required"),
    description: Yup.string()
      .max(240, "Description must be 240 characters or less")
  }),
});

export default getTaskFormProps;