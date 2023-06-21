import {authApiClient} from "../../../../data/apollo-client";
import GET_MOVIE_LISTS from "../../../../data/queried/getMovieList";

export default async function handler(req, res) {
  const filter = `data/category/iv eq 'TV Show'`
  const authClient = await authApiClient();
  const {data, error} = await authClient.query({
    query: GET_MOVIE_LISTS,
    variables: { filter: filter },
  });
  if (error) {
    return res.status(400).json({message: "Something went wrong. Please try again later"})
  }
  return res.status(200).json({movies: data?.queryShowContents})
}