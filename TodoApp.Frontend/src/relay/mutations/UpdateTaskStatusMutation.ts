import { graphql } from 'relay-runtime';

export const updateTaskStatusMutation = graphql`
  mutation UpdateTaskStatusMutation($input: UpdateTaskStatusInput!) {
    updateTaskStatus(input: $input) {
      id
      title
      description
      status
      createdAt
      updatedAt
    }
  }
`;
