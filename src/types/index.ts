import type { Location } from "react-router";

export interface Board {
  id: number;
  title: string;
}

export type NewBoard = Omit<Board, "id">;

export type TaskStatus = "todo" | "doing" | "done";

export interface Subtask {
  id: number;
  title: string;
}

export interface Task {
  id: number;
  boardId: number;
  title: string;
  description: string;
  status: TaskStatus;
  subtasks: Subtask[];
  // ids of checked subtasks, stored as strings by the checkbox group
  checkedSubtasks: string[];
}

export type NewTask = Omit<Task, "id">;

export interface PreviousLocationState {
  previousLocation: Location;
}
