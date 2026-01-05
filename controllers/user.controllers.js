import jwt from "jsonwebtoken";


import { createUserfn, getUserByEmail, getUserById, updateUserRoleOrstatus } from "../services/user.service.js";
import {successResponseBody, errorResponseBody} from "../utils/responseBody.js"


const signup = async (req, res) => {
  try {
    const response = await createUserfn(req.body);
    successResponseBody.data = response;
    successResponseBody.message = "Successfully register a user";
    return res.status(201).json(successResponseBody);
  } catch (error) {
    if(error.err){
      errorResponseBody.error = error.err;
      return res.status(error.code).json(errorResponseBody);
    }
    errorResponseBody.error = error;
    return res.status(500).json(errorResponseBody)
  }
}


const signin = async (req, res) => {
  try {
    const {email, password} = req.body;
    const user = await getUserByEmail(email);
    // console.log("user", user);

    const isValidPassword = await user.isValidPassword(password);
    // console.log("isValidPassword", isValidPassword);

    if(!isValidPassword){
      throw {err: "Invalid password for the given email", code: 401}
    }
    // console.log(user.id)

    const token = jwt.sign(
      {id: user.id, email: user.email}, 
      process.env.AUTH_KEY,
      {expiresIn: '1h'}
    )

    // console.log(jwt.verify(token, process.env.AUTH_KEY))

    successResponseBody.message = "Successfully logged in";
    successResponseBody.data = {
      email: user.email,
      role: user.role,
      status: user.userStatus,
      token: token
    }
    return res.status(201).json(successResponseBody);
  } catch (error) {
    console.log("error", error)
    if(error.err){
      errorResponseBody.error = error.err;
      return res.status(error.code).json(errorResponseBody);
    }
    errorResponseBody.error = error.err;
    return res.status(500).json(errorResponseBody);
  }
}


const resetpassword = async (req, res) => {
  try {
    // console.log(req.body.id, req.body.oldPassword)
    const user = await getUserById(req.user)
    const oldPassword = await user.isValidPassword(req.body.oldPassword);
    if(!oldPassword){
      throw {
        err: 'Invalid old password, Please write the correct old password',
        code: 403
      }
    }
    user.password = req.body.newPassword;
    await user.save();

    successResponseBody.data = user;
    successResponseBody.message = 'Successfully updated the password for the given user';
    return res.status(200).json(successResponseBody);
  } catch (error) {
    if(error.err){
      errorResponseBody.err = error.err;
      return res.status(error.code).json(errorResponseBody);
    }
    errorResponseBody.err = error
    return res.status(500).json(errorResponseBody)
  }
}


const update = async (req, res) => {
  try {
    // console.log("req", req.body, req.params.id)
    const response = await updateUserRoleOrstatus(req.body, req.params.id)

    successResponseBody.data = response;
    successResponseBody.message = 'Successfully updated the user';
    return res.status(200).json(successResponseBody);
  } catch (error) {
    if(error.err){
      errorResponseBody.error = error.err;
      return res.status(error.code).json(errorResponseBody);
    }
    errorResponseBody.error = error;
    return res.status(500).json(errorResponseBody);
  }
}


export {
  signup,
  signin,
  resetpassword,
  update
}