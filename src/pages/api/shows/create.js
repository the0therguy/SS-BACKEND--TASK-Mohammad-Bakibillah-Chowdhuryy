import jwt from "jsonwebtoken";

export default async function handler(req, res){
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
    console.log(data)
    if (data?.data?.roles != 'admin' ) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    return res.status(200).json({message:'successfull'})
    
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }}