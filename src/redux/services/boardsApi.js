import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const boardsApi = createApi({
  reducerPath: "boards",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/boards" }),
  tagTypes: ["Board"],
  endpoints: (builder) => ({
    getBoards: builder.query({
      query: (searchParams) => searchParams ? `?title_like=${searchParams}` : "",
      providesTags: (result) =>
      result
        ? [
            ...result.map(({ id }) => ({ type: "Board", id })),
            { type: "Board", id: "LIST" },
          ]
        : [{ type: "Board", id: "LIST" }],
    }),
    getBoard: builder.query({
      query: (id) => id,
      providesTags: (result) =>
      result
        ? [
            result,
            { type: "Board", id: "LIST" },
          ]
        : [{ type: "Board", id: "LIST" }],
    }),
    postBoard: builder.mutation({
      query: (body) => ({
        url: "",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Board", id: "LIST" }],
    }),
    deleteBoard: builder.mutation({
      query: (id) => ({
        url: String(id),
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Board", id: "LIST" }],
    }),
    patchBoard: builder.mutation({
      query: ({ id, ...body }) => ({
        url: String(id),
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: "Board", id: "LIST" }],
    })
  }),
});
  
export const { useGetBoardsQuery, useGetBoardQuery, usePostBoardMutation, useDeleteBoardMutation, usePatchBoardMutation } = boardsApi;
