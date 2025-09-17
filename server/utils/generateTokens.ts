

import jwt from "jsonwebtoken";

function generatetoken (id: string,secret: string){
    const accesstoken = jwt.sign({userId : id}, secret,{ expiresIn: "15m"  })
    const refreshtoken = jwt.sign({userId : id}, secret,{ expiresIn: "1h"  })
    return {accesstoken,refreshtoken}
}

export default generatetoken 