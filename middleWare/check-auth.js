import jwt from "jsonwebtoken";


module.exports = (req, res, next) =>{
  try {
    const token  = req.header('Authorization')
    const decode = jwt.verify(token, process.env.TOKEN_SECRET)

    req.questions = decode
    next();
  }
  catch(err){
  return res.status(401).json({
    message: "Authorisation Failed"
  })
  }
}

