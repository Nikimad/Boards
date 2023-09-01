import fetchWrapper from "../helpers/fetchWrapper";

const fetchTasks = fetchWrapper("tasks");

export default {
  getTasks: ({ boardId, searchParams }) =>
    fetchTasks.get(
      `?boardId=${boardId}${searchParams ? `&q=${searchParams}` : ""}`
    ),
  getTask: (id) => fetchTasks.get(id),
  postTask: (task) => fetchTasks.post(task),
  patchTask: ({ id, ...changes }) => fetchTasks.patch(id, changes),
  deleteTask: (id) => fetchTasks.delete(id),
};
