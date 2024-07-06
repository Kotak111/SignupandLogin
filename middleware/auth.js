const jwt = require('jsonwebtoken')
exports.verifyUser = (req,res,next) =>{
    let token = req.headers.authorization;
    console.log(req.headers.authorization);
    if (!token) {
        return res.status(401).send({
            error: "Access Denied / Unauthorized request"
        })
    }
    
    try {
        token = token.split(' ')[1];
        if (token === 'null' || !token) {
            return res.status(401).send({
                error: 'Unauthorized request'
            });
        }
        
        let verifiedUser = jwt.verify(token, "harshkey");
        if (!verifiedUser) return res.status(401).send({
            error: 'Unauthorized request'
        })
        req.user = verifiedUser; 
        next();

    } catch (err) {
        console.log(err)
        res.status(400).json({
            error: true,
            message: "Invalid Token"
        })
    }
}

exports.Isuser = async (req,res,next)=>{
    console.log(req.user);
    if (req.user.userrole == 0) {
        next();
    } else {
     
        return res.status(401).send("Unauthorized!");

    }
}