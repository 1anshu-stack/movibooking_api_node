import jwt from "jsonwebtoken"

import { getUserById } from "../services/user.service.js"
import { USER_ROLE } from "../utils/constans.js"


const badRequestResponse = {
  success: false,
  err: [],
  data: {},
  message: "Malformed Request | Bad Request"
}


/**
 * validator for signup request
 * @param req -> http request object
 * @param res -> http response object
 * @param next -> next middleware
 * @returns 
 */
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


/**
 * validator for signin request
 * @param req -> http request object
 * @param res -> http response object
 * @param next -> next middleware
 * @returns 
 */
const validateSigninRequest = async (req, res, next) => {
  // validate email of the user
  if(!req.body.email){
    badRequestResponse.err.push("No email provide for signin")
  }

  // validate password of the user
  if(!req.body.password){
    badRequestResponse.err.push("No password provide for singin")
  }

  if(badRequestResponse.err.length > 0){
    return res.status(422).json(badRequestResponse);
  }
  next();
}


const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    // console.log("token", token)
    if(!token){
      badRequestResponse.err = "No token provided";
      return res.status(403).json(badRequestResponse);
    }
  
    const response = jwt.verify(token, process.env.AUTH_KEY);
    if(!response){
      badRequestResponse.err = "Token not verified";
      return res.status(401).json(badRequestResponse)
    }
    const user = await getUserById(response.id)
    req.user = user.id;
    next();
  } catch (error) {
    if(error.name == "JsonWebTokenError"){
      badRequestResponse.err = error.message;
      return res.status(401).json(badRequestResponse)
    }
    if(error.code == 404){
      badRequestResponse.err = "User doesn't exist"
      return res.status(error.code).json(badRequestResponse);
    }
    badRequestResponse.err = error;
    return res.status(500).json(badRequestResponse);
  }
}


const validateResetPasswordRequest = async (req, res, next) => {
  // validate Old password presence
  if(!req.body.oldPassword){
    badRequestResponse.err.push('Missing the old password in the request');
  }

  // validate new password presence
  if(!req.body.newPassword){
    badRequestResponse.err.push('Missing the new password in the request');
  }

  if(badRequestResponse.err.length > 0)
    return res.status(400).json(badRequestResponse);

  //we can proceed
  next();
}


const validateUpdateUserRequest = (req, res, next) => {
  // validate presence of atleast one of the two i.e userRole or userStatus
  // console.log("Request body:", req)
  if(!(req.body.userRole || req.body.userStatus)){
    badRequestResponse.err.push('Malformed request, please send alteast on parameter')
    return res.status(400).json(badRequestResponse);
  }

  next();
}


const isAdmin = async (req, res, next) => {
  console.log("req:", req.user);
  const user = await getUserById(req.user);
  if(user.userRole != USER_ROLE.admin){
    badRequestResponse.err.push("User is not a admin, cannot proceed with the request")
    return res.status(401).json(badRequestResponse)
  }

  next();
}


const isClient = async (req, res, next) => {
  const user = await getUserById(req.user);
  if(user.userRole != USER_ROLE.client){
    badRequestResponse.err.push("User is not a client, cannot proceed with the request")
    return res.status(401).json(badRequestResponse)
  }

  next();
}


const isAdminOrClient = async (req, res, next) => {
  const user = await getUserById(req.user);
  if(user.userRole != USER_ROLE.client && user.userRole != USER_ROLE.admin){
    badRequestResponse.err.push("User is neither a client not an admin, cannot proceed with the request")
    return res.status(401).json(badRequestResponse)
  }

  next();
}


export {
  validateSignupRequest, 
  validateSigninRequest, 
  isAuthenticated,
  validateResetPasswordRequest,
  validateUpdateUserRequest,
  isAdmin,
  isClient,
  isAdminOrClient
}