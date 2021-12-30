const jwt= require('jsonwebtoken');

module.exports= (req, res, next)=>{
  try{
    //req.headers.authorization= "Bearer v1/zlui47i82dbu3o", where 'v1/zlui47i82dbu3o' is the token
    const token= (req.headers.authorization).split(' ')[1];
    const decodedToken= jwt.verify(token, 'secret_key_which_should_be_long');
    req.userData= decodedToken;
    next();
  }catch(err){
    console.log(err);
    return res.status(401).json({
      message: 'Auth Failed!'
    })
  }
}
