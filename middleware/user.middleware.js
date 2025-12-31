import jwt from "jsonwebtoken"

import { getUserById } from "../services/user.service.js"


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


export {
  validateSignupRequest, 
  validateSigninRequest, 
  isAuthenticated
}