import GET_USER_BY_USERNAME from "../../../../data/queried/getUserByUsername";
import {compare} from "bcrypt";
import jwt from "jsonwebtoken";
import {authApiClient} from "../../../../data/apollo-client";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    if (!req.body)
      return res?.status(404)?.json({error: "Don't Have form data"});
    
    const {username, password} = req.body
    const filter = `data/username/iv eq '${username}'`;
    const authClient = await authApiClient();
    const {data, error} = await authClient.query({
      query: GET_USER_BY_USERNAME,
      variables: { filter: filter },
    });
    if (error) {
      console.log(error)
      return res.status(400).json({message: "Something went wrong. Please try again later"})
    }
    const results = data?.queryUser2Contents[0]?.flatData
    if (!results) {
      return res.status(400).json({message: "this username is not available"})
    }
    //compare
    const checkPassword = await compare(
      password,
      results.password
    );
    if (!checkPassword || results.username !== username) {
      return res.status(400).json({message: "Username and Password doesn't match"})
    }
    const token = jwt.sign({ data: {
      username:username,
      roles:results.roles
      } }, 'your-secret-key', { expiresIn: 60*60*24 });
    return res.status(200).json({token:token});
  } else {
    res
      ?.status(500)
      ?.json({ message: "HTTP method not valid only POST accepted" });
  }
}