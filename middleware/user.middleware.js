const badRequestResponse = {
  success: false,
  err: [],
  data: {},
  message: "Malformed Request | Bad Request"
}

const validateSignupRequest = async (req, res, next) => {
  // validate name of the user
  if(!req.body.name){
    badRequestResponse.err.push("Name of the user not present in the request")
  }

  // validate email of the user
  if(!req.body.email){
    badRequestResponse.err.push("Email of the user not present in the request")
  }

  // validate password of the user
  if(!req.body.password){
    badRequestResponse.err.push("Password of the user not present in the request")
  }

  if(badRequestResponse.err.length > 0){
    return res.status(422).json(badRequestResponse);
  }
  next();
}


export default validateSignupRequest;