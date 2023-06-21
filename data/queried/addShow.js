import {gql} from "@apollo/client";

const ADD_SHOW_QUERY = gql`
  mutation ($uuid: String, $showName: String, $duration: Float, $casts: [ShowDataCastsChildInputDto!], $category: String, $directors: [ShowDataDirectorsChildInputDto!]) {
    createShowContent (
      data: {
        uuid: {iv: $uuid},
        showName: {iv: $showName},
        duration: {iv: $duration},
        casts: {iv: $casts},
        directors: {iv: $directors},
        category: {iv: $category}
      }
      publish: true
    ) {
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

export default ADD_SHOW_QUERY