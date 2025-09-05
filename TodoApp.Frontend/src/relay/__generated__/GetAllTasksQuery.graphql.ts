/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAllTasksQuery
// ====================================================

export interface GetAllTasksQuery {
  getAllTasks: {
    edges: Array<{
      node: {
        id: number;
        title: string;
        description: string | null;
        status: TaskStatus;
        createdAt: string;
        updatedAt: string | null;
      };
    }>;
    pageInfo: {
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor: string | null;
      endCursor: string | null;
    };
  } | null;
}

export enum TaskStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED"
}
