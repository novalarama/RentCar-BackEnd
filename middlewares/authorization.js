let jwt = require("jsonwebtoken")
exports.authorization = (request, response, next) => {
    // token dikirim melalui header
    let header = request.headers.authorization

    let token = header && header.split(" ")[1]

    if(token === null){
        return response.json({
            message : `Unauthorized`

        })
    }else {
        let secretKey = "Rental Mobil"
        jwt.verify(token, secretKey, (error, karyawan) => {
            if(error){
                return response.json({
                    message : `Invalid Token`
                })
            }else{
                next()
            }
        })
    }
}