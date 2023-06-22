import {authApiClient} from "../../../../data/apollo-client";
import GET_SHOW_BY_ID from "../../../../data/queried/getShowByID";

export default async function handler(req, res) {
  const filter = `data/uuid/iv eq '${req.query.uuid}'`
  const authClient = await authApiClient();
  const {data, error} = await authClient.query({
    query: GET_SHOW_BY_ID,
    variables: { filter: filter },
  });
  if (error) {
    console.log(error)
    return res.status(400).json({message: "Something went wrong. Please try again later"})
  }
  if (data?.queryShowContents[0]?.flatData) {
    const show = data?.queryShowContents[0]?.flatData
    return res.status(200).json({message: "success", show: show})
  }
  return res.status(200).json({message: "No Show found"})
}