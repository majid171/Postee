const jwt = require('jsonwebtoken');

module.exports = async(req, res, next) =>{
    try{
        const token = req.cookies.token;

        if(!token){
            return res.status(403).json('Not Authorized');
        }

        const payload = jwt.verify(token, process.env['secret']);
        
        if(payload){
            req.user = payload.user;
            next();
        }
        else{
            return res.status(403).json('Not Authorized');
        }

    }catch(error){
        console.error(error);
        return res.status(403).json('Not Authorized');
    }
}