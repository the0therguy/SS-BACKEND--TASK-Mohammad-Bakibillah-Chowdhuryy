import { hash } from "bcrypt";
import {v4 as uuidv4} from 'uuid';
import ADD_USER_QUERY from "../../../../data/queried/addUser";
import {authApiClient} from "../../../../data/apollo-client";

export default async function handler(req, res) {
  if (req.method === "POST") {
    if (!req.body)
      return res?.status(404)?.json({ error: "Don't Have form data" });
    
    const { email, username, password } = req.body;
    const hash_pass = await hash(password, 12);
    const authClient = await authApiClient();
    const { data, errors } = await authClient.mutate({
      mutation: ADD_USER_QUERY,
      variables: {
        uuid: uuidv4(),
        email:email,
        username: username,
        password: hash_pass,
      },
    });
    if (errors === undefined) {
      res.status(201).json({
        message: "user created",
        data: data?.data,
      });
    } else {
      return res.status(400).json({ message: "something went wrong" });
    }
  } else {
    res
      ?.status(500)
      ?.json({ message: "HTTP method not valid only POST accepted" });
  }
}