import {gql} from "@apollo/client";

const GET_SHOW_BY_NAME = gql`
  query ($filter: String!) {
    queryShowContents(filter: $filter) {
      id
      flatData {
        uuid
        showName
        casts {
          name
          roleName
        }
        duration
        directors {
          name
        }
        category
      }
    }
  }
`

export default GET_SHOW_BY_NAME