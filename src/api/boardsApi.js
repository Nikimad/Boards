import fetchWrapper from "../helpers/fetchWrapper";

const fetchBoards = fetchWrapper("boards");

export default {
  getBoards: (searchParams) => fetchBoards.get(`${searchParams ? `?q=${searchParams}` : ""}`),
  getBoard: (id) => fetchBoards.get(id),
  postBoard: (board) => fetchBoards.post(board),
  patchBoard: ({ id, ...changes }) => fetchBoards.patch(id, changes),
  deleteBoard: (id) =>fetchBoards.delete(id),
};
