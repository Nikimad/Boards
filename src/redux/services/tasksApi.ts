import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { NewTask, Task } from "../../types";

export const tasksApi = createApi({
  reducerPath: "tasks",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/tasks"}),
  tagTypes: ["Task"],
  endpoints: (builder) => ({
    getTasks: builder.query<Task[], { boardId: string | undefined; searchParams?: string | null }>({
      query: (params) => `?boardId=${params?.boardId}${params?.searchParams ? `&q=${params?.searchParams}` : ""}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Task" as const, id })),
              { type: "Task", id: "LIST" },
            ]
          : [{ type: "Task", id: "LIST" }],
      transformResponse: (response: Task[]) => response.sort((a, b) => b.id - a.id),
    }),
    getTask: builder.query<Task, string | undefined>({
      query: (id) => `/${id}`,
      providesTags: (result) =>
        result
          ? [
              { type: "Task", id: result.id },
              { type: "Task", id: "LIST" },
            ]
          : [{ type: "Task", id: "LIST" }],
    }),
    postTask: builder.mutation<Task, NewTask>({
      query: (body) => ({
        url: "",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Task", id: "LIST" }],
    }),
    deleteTask: builder.mutation<void, number>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Task", id: "LIST" }],
    }),
    patchTask: builder.mutation<Task, Partial<Task>>({
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
