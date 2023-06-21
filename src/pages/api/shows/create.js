import jwt from "jsonwebtoken";
import {authApiClient} from "../../../../data/apollo-client";
import ADD_SHOW_QUERY from "../../../../data/queried/addShow";
import {v4 as uuidv4} from 'uuid';

export default async function handler(req, res){
  if (req.method === 'POST') {
    if (!req.body)
      return res?.status(404)?.json({ error: "Don't Have form data" });
    try {
      const token = req.headers.authorization?.replace('Bearer ', '');
      
      if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      var data;
      jwt.verify(token, 'your-secret-key', function (err, decoded) {
        if (err) {
          return res.status(400).json({message: "Please login again"})
        } else {
          data = decoded
        }
      });
      const {category, showName, duration, casts, directors} = req.body
      if (data?.data?.roles != 'admin' ) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      const authClient = await authApiClient();
      const results = data?.queryShowContents?.flatData
      if (results) {
        return res.status(400).json({message: "data is available"})
      }
      const queryData = await authClient.mutate({
        mutation: ADD_SHOW_QUERY,
        variables: {
          uuid: uuidv4(),
          showName: showName,
          duration: duration,
          category: category,
          casts: casts,
          directors:directors
        }
        }
      )
      // console.log(queryData?.data?.createShowContent?.flatData)
      return res.status(200).json({message:'successfull', shows: queryData?.data?.createShowContent?.flatData})
      
    } catch (error) {
      return res.status(401).json({ message: 'Unauthorized', error: error });
    }
  } else {
    res
      ?.status(500)
      ?.json({ message: "HTTP method not valid only POST accepted" });
  }
}