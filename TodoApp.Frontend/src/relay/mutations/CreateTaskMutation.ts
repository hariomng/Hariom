import { graphql } from 'relay-runtime';

export const createTaskMutation = graphql`
  mutation CreateTaskMutation($input: CreateTaskInput!) {
    createTask(input: $input) {
      id
      title
      description
      status
      createdAt
      updatedAt
    }
  }
`;
