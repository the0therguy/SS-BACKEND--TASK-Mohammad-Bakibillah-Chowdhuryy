import { gql } from "@apollo/client";

const ADD_USER_QUERY = gql`
  mutation ($uuid: String, $username: String, $email: String, $password: String, $roles: String) {
    createUser2Content(
      data: {
      uuid: { iv: $uuid },
      email: { iv: $email },
      username: { iv: $username },
      password: { iv: $password },
      roles: { iv: $roles }
      }
      publish: true
    ) {
      id
      flatData {
        username
        email
      }
    }
  }
`;

export default ADD_USER_QUERY;