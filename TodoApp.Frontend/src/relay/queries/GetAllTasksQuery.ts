import { graphql } from 'relay-runtime';

export const getAllTasksQuery = graphql`
  query GetAllTasksQuery {
    getAllTasks {
      edges {
        node {
          id
          title
          description
          status
          createdAt
          updatedAt
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;
