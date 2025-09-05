/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateTaskMutation
// ====================================================

export interface CreateTaskMutation {
  createTask: {
    id: number;
    title: string;
    description: string | null;
    status: TaskStatus;
    createdAt: string;
    updatedAt: string | null;
  };
}

export interface CreateTaskMutationVariables {
  input: {
    title: string;
    description?: string | null;
  };
}

export enum TaskStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED"
}
