import "./TaskPreview.scss";
import { Form, Field } from "formik";
import { ReactComponent as View } from "../../assets/svg/view.svg";
import { ReactComponent as Select } from "../../assets/svg/select.svg";
import Modal from "../Modal";

const TaskPreview = ({
  title,
  status,
  subtasks,
  checkedSubtasks,
  setActiveTask,
  submitOnChange,
}) => (
  <div className="task-preview">
    <button onClick={setActiveTask} className="task-preview__content">
      <h3 className="task-preview__content__title">{title}</h3>
      <p className="task-preview__content__text">
        {subtasks.length > 0
          ? `${checkedSubtasks.length} of ${subtasks.length} subtasks`
          : `Status: ${status}`}
      </p>
    </button>
    <Modal>
      <button className="task-preview__open-review">
        <View />
      </button>
      <div className="task-review">
        <h2 className="task-review__title">{title}</h2>
        <Form className="form task-review__form">
          {subtasks.length > 0 ? (
            <div
              className="form__label"
              role="group"
              aria-labelledby="checkbox-group"
            >
              <span className="form__label__title">Subtasks</span>
              {subtasks.map((subtask, index) => (
                <label className="form__check" key={index}>
                  <Field
                    className="form__check__input"
                    onChange={submitOnChange}
                    type="checkbox"
                    name="checkedSubtasks"
                    value={`${subtask.id}`}
                  />
                  <span className="form__check__box"></span>
                  {subtask.title}
                </label>
              ))}
            </div>
          ) : null}
          <label className="form__label form__select">
            <span className="form__label__title">Status</span>
            <Field
              className="form__input form__input_select"
              onChange={submitOnChange}
              name="status"
              component="select"
            >
              <option defaultValue="todo" value="todo">
                Todo
              </option>
              <option value="doing">Doing</option>
              <option value="done">Done</option>
            </Field>
            <Select className="form__select-appearance" />
          </label>
        </Form>
      </div>
    </Modal>
  </div>
);

export default TaskPreview;
