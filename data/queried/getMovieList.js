import {gql} from "@apollo/client";

const GET_MOVIE_LISTS = gql`
  query ($filter: String!) {
    queryShowContents(filter: $filter) {
      flatData {
        showName
        duration
      }
    }
  }
`
export default GET_MOVIE_LISTS