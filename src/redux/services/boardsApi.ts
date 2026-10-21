import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Board, NewBoard } from "../../types";

export const boardsApi = createApi({
  reducerPath: "boards",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/boards" }),
  tagTypes: ["Board"],
  endpoints: (builder) => ({
    getBoards: builder.query<Board[], string | null | undefined>({
      query: (searchParams) => searchParams ? `?title_like=${searchParams}` : "",
      providesTags: (result) =>
      result
        ? [
            ...result.map(({ id }) => ({ type: "Board" as const, id })),
            { type: "Board", id: "LIST" },
          ]
        : [{ type: "Board", id: "LIST" }],
      transformResponse: (response: Board[]) => response.sort((a, b) => b.id - a.id),
    }),
    getBoard: builder.query<Board, string | undefined>({
      query: (id) => `/${id}`,
      providesTags: (result) =>
      result
        ? [
            { type: "Board", id: result.id },
            { type: "Board", id: "LIST" },
          ]
        : [{ type: "Board", id: "LIST" }],
    }),
    postBoard: builder.mutation<Board, NewBoard>({
      query: (body) => ({
        url: "",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Board", id: "LIST" }],
    }),
    deleteBoard: builder.mutation<void, number>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Board", id: "LIST" }],
    }),
    patchBoard: builder.mutation<Board, Partial<Board>>({
      query: ({ id, ...body }) => ({
        url: `/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: "Board", id: "LIST" }],
    })
  }),
});
  
export const { useGetBoardsQuery, useGetBoardQuery, usePostBoardMutation, useDeleteBoardMutation, usePatchBoardMutation } = boardsApi;
