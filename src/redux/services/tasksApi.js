import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tasksApi = createApi({
  reducerPath: "tasks",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/tasks"}),
  tagTypes: ["Task"],
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: ({ boardId, searchParams }) => `?boardId=${boardId}${searchParams ? `&q=${searchParams}` : ""}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Task", id })),
              { type: "Task", id: "LIST" },
            ]
          : [{ type: "Task", id: "LIST" }],
      transformResponse: (response) => response.sort((a, b) => b.id - a.id),
    }),
    getTask: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result) =>
        result
          ? [
              result,
              { type: "Task", id: "LIST" },
            ]
          : [{ type: "Task", id: "LIST" }],
    }),
    postTask: builder.mutation({
      query: (body) => ({
        url: "",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Task", id: "LIST" }],
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Task", id: "LIST" }],
    }),
    patchTask: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: "Task", id: "LIST" }],
    })
  }),
});

export const { useGetTasksQuery, useGetTaskQuery, usePostTaskMutation, useDeleteTaskMutation, usePatchTaskMutation } = tasksApi;
