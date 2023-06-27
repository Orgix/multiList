import jwt from "jsonwebtoken";

const secret = 'test-key';

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(typeof token)
    let decodedData;

    if (token) {      
      decodedData = jwt.verify(token, secret);

      req.userId = decodedData?.id;
    } 

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;