import User from "../models/user.model.js";


const createUserfn = async (data) => {
  try {
    const response = await User.create(data);
    return response;
  } catch (error) {
    console.log(error);
    if(error.name == 'ValidationError'){
      let err = {};
      Object.keys(error.errors).forEach((key) => {
        err[key] = error.errors[key].message;
      })
      throw {err: err, code: 422}
    }
    throw error;
  }
}


export {
  createUserfn 
}