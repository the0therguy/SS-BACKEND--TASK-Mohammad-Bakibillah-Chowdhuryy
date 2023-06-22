import {gql} from "@apollo/client";

const GET_SHOW_BY_ID = gql`
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
        category
        duration
        directors {
          name
        }
      }
    }
  }
`

export default GET_SHOW_BY_ID