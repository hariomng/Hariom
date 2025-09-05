/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateTaskStatusMutation
// ====================================================

export interface UpdateTaskStatusMutation {
  updateTaskStatus: {
    id: number;
    title: string;
    description: string | null;
    status: TaskStatus;
    createdAt: string;
    updatedAt: string | null;
  } | null;
}

export interface UpdateTaskStatusMutationVariables {
  input: {
    id: number;
    status: TaskStatus;
  };
}

export enum TaskStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED"
}
