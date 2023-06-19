import { gql } from "@apollo/client";

const ADD_USER_QUERY = gql`
  mutation ($uuid: String, $username: String, $email: String, $password: String) {
    createUser2Content(
      data: {
      uuid: {iv: $uuid},
      email: {iv: $email},
      username: { iv: $username },
      password: { iv: $password }
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