import { gql } from "@apollo/client";

const GET_USER_BY_USERNAME = gql`
  query ($filter: String!) {
    queryUser2Contents(filter: $filter) {
      id
      flatData {
        username
        password
        roles
      }
    }
  }
`;

export default GET_USER_BY_USERNAME;