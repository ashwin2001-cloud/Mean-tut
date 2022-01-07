const jwt= require('jsonwebtoken');

module.exports= (req, res, next)=>{
  try{
    //req.headers.authorization= "Bearer v1/zlui47i82dbu3o", where 'v1/zlui47i82dbu3o' is the token
    const token= (req.headers.authorization).split(' ')[1];
    const decodedToken= jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userData= decodedToken;
    next();
  }catch(err){
    console.log(err);
    return res.status(401).json({
      message: 'You are not authenticated!'
    })
  }
}
